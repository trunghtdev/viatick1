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

function connection(uri, cache) {
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
          [headersPropertiesName.authorization]: await AsyncStorage.getItem(localStoragePropertiesName.authorization) || ' ',
          [headersPropertiesName.xApiKey]: 'da2-zlk3xmy44fg4jpj73vlwlfi7sq',
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
        [headersPropertiesName.authorization]: await AsyncStorage.getItem(localStoragePropertiesName.authorization) || ' ',
        [headersPropertiesName.xApiKey]: 'da2-zlk3xmy44fg4jpj73vlwlfi7sq',
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

  return authLink.concat(link)
}

const clientConnection = (uri) => {
  const cache = new InMemoryCache()
  // *__TODO: if only local server
  const link = connection(uri, cache)
  const client = new ApolloClient({
    link: link,
    cache: cache
  })
  return client
}

export { clientConnection }
