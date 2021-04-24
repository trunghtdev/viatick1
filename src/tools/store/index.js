import { action } from 'mobx'

class Store {
  constructor(auth = undefined, connection = undefined) {
    this.auth = auth
    this.connection = connection
    // new Auth(token, expireAt, tokenType)
  }

  @action.bound
  setAuth = (auth) => {
    this.auth = auth
  }

  @action.bound
  setConnection = (connection) => {
    this.connection = connection
  }
}

export * from './auth'
export * from './connection'
export { Store }