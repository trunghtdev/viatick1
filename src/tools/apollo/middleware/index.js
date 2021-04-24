import { onError } from 'apollo-link-error'

const errorMiddleware = onError(({
  networkError,
  graphQLErrors,
  response
}) => {
  // if (networkError) {
  //   console.error(`[Network Error]: ${networkError}`)
  // }
  // if (graphQLErrors) {
  //   console.error(`[GraphQLErrors Error]: ${graphQLErrors}`)
  // }
})

export { errorMiddleware }
