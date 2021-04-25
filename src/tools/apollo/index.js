import AsyncStorage from '@react-native-community/async-storage'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from 'apollo-utilities'
// import crypto from 'crypto'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
// import { RetryLink } from 'apollo-link-retry'
import { localStoragePropertiesName, headersPropertiesName } from '../../constants'

import { errorMiddleware } from './middleware'
/* eslint-disable max-len */

function connection(uri, customHeaders) {
  const protocol = uri.split('://').shift()
  const urn = uri.split('://').pop()
  const httpLink = protocol === 'http'
    ? createPersistedQueryLink().concat(createHttpLink({ uri }))
    : createHttpLink({ uri })

  const wsClient = new SubscriptionClient(
    `${protocol === 'http' ? 'ws' : 'wss'}://${urn}`,
    {
      connectionParams: async () => {
        return {
          ...headers,
          ...(await customHeaders()),
          'content-type': 'application/json'
        }
      },
      reconnect: true,
    }
  )

  const wsLink = new WebSocketLink(wsClient)

  const authLink = setContext(async (_, req) => {
    const { headers } = req
    return {
      forceFetch: true,
      headers: {
        ...headers,
        ...(await customHeaders()),
        'content-type': 'application/json'
      }
    }
  })

  const linkSplit = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    }, wsLink, httpLink
  )

  const link = ApolloLink.from([
    errorMiddleware,
    linkSplit
  ])

  return {
    link: authLink.concat(link),
    socket: wsClient
  }
}

const clientConnection = (localUri = null, cloudUri = null) => {
  const cache = new InMemoryCache()
  // *__ TODO: if both cloud server and local server
  const { link: localLink } = connection(localUri, async () => ({
    [headersPropertiesName.authorization]: await AsyncStorage.getItem(localStoragePropertiesName.authorization) || ' ',
  }))

  const { link: cloudLink } = connection(cloudUri, async () => ({
    [headersPropertiesName.authorizationViatickBMS]: await AsyncStorage.getItem(localStoragePropertiesName.authorizationViatickBMS) || ' ',
    [headersPropertiesName.xApiKey]: "da2-zlk3xmy44fg4jpj73vlwlfi7sq",
  }))

  const client = new ApolloClient({
    link: ApolloLink.split(
      operation => operation.getContext().connection === 'ViaTick-BMS',
      cloudLink,
      localLink
    ),
    cache: cache
  })
  return client
}

export { clientConnection }
