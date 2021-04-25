import { action } from 'mobx'
import { Global } from './global'
import { Objects } from './objects'

class Store {
  constructor(auth = undefined, connection = undefined) {
    this.auth = auth
    this.connection = connection
    this.global = new Global(this)
    this.objects = new Objects(this)
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