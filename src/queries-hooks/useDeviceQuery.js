import { useLazyQuery } from '@apollo/react-hooks'
import { useCallback, useEffect } from 'react'
import { GET_SENSORS_WITH_IOT } from '../graphql/device'
function useDeviceQuery() {
  const [_getSensorsWithIOT, { data: dataSensorsWithIOT, error }] = useLazyQuery(GET_SENSORS_WITH_IOT)
  const getSensorsWithIOT = useCallback(async (variables = {}) => {
    _getSensorsWithIOT({
      variables
    })
  }, [])

  useEffect(() => {
    console.log({ error })
  }, [error])

  return {
    getSensorsWithIOT,
    dataSensorsWithIOT
  }
}

export { useDeviceQuery }