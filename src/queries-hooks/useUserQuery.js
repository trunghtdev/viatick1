import React, { useCallback } from 'react'
import { useMutation } from 'react-apollo'
import { LOGIN, CREATE_ONE_USER } from '../graphql/user'

export function useUserQuery() {
  const [loginCloud] = useMutation(LOGIN)
  const [createOneUser] = useMutation(CREATE_ONE_USER)

  const regist = useCallback(async (input) => {
    return await createOneUser({
      variables: {
        newUser: input
      },
      context: {
        connection: 'ViaTick-BMS'
      }
    })
  }, [])

  const login = useCallback(async (account, password) => {
    return await loginCloud({
      variables: {
        loginInput: {
          account,
          password
        }
      }
    })
  }, [])
  return {
    login,
    regist
  }
}