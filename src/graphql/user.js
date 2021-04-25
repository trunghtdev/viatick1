import gql from 'graphql-tag'
// authentication
export const LOGIN = gql`
  mutation login($loginInput: LoginInput!){
    login(loginInput: $loginInput){
      token
    }
  }
`

export const FIND_MANY_USER = gql`
  query findManyUser($inputUser: UpdateUserInput) {
    findManyUser(inputUser: $inputUser) {
      _id
      idRole
      username
      firstname
      lastname
      email
      phonenumber
      isVerified
      isLocked
      isActive
      avatar
      createdBy
      updatedAt
      updatedBy
    }
  }
`

export const AUTHEN_USER = gql`
  query findAuthenUser {
    findAuthenUser {
      _id
      idRole
      username
      firstname
      lastname
      email
      phonenumber
      isVerified
      isLocked
      isActive
      avatar
      createdBy
      updatedAt
      updatedBy
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($update: UpdateUserInput!) {
    updateProfile(update: $update)
  }
`
export const RESET_PASSWORD = gql`
  mutation resetPassword($userId: ID!, $password: String!) {
    resetPassword(userId: $userId, password: $password)
  }
`
export const FORGOT_PASSWORD = gql`
  mutation sendCodeForgotPassword($email: String!) {
    sendCodeForgotPassword(email: $email) {
      userId
      code
    }
  }
`

export const CREATE_ONE_USER = gql`
  mutation import($newUser: NewUserInput!) {
    createOneUser(newUser: $newUser)
  }
`

export const UPDATE_ONE_USER = gql`
  mutation updateOneUser($userId: ID!, $update: UpdateUserInput!) {
    updateOneUser(userId: $userId, update: $update)
  }
`

export const DELETE_ONE_USER = gql`
  mutation deleteOneUser($userId: ID!) {
    deleteOneUser(userId: $userId)
  }
`