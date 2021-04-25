import { useLazyQuery } from '@apollo/react-hooks'
import { useCallback, useEffect } from 'react'
import { GET_SENSORS_WITH_IOT, GET_MODEL } from '../graphql/device'
function useDeviceQuery() {
  const [_getSensorsWithIOT, { data: dataSensorsWithIOT }] = useLazyQuery(GET_SENSORS_WITH_IOT)
  const [_getModel, { data: dataModel, error }] = useLazyQuery(GET_MODEL)

  const getSensorsWithIOT = useCallback(async (variables = {}) => {
    _getSensorsWithIOT({
      variables
    })
  }, [])

  const getModel = useCallback(async (variables = {}) => {
    _getModel({
      variables,
      context: {
        connection: 'ViaTick-BMS'
      }
    })
  }, [_getModel])

  useEffect(() => {
    if (!!error?.graphQLErrors) {
      error?.graphQLErrors.forEach(err => {
        console.log({
          ...err
        })
      })
    }
  }, [error])

  return {
    getSensorsWithIOT,
    dataSensorsWithIOT,
    getModel,
    dataModel
  }
}

export { useDeviceQuery }