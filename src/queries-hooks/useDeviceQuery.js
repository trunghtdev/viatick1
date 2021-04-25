import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useCallback, useEffect } from 'react'
import { GET_SENSORS_WITH_IOT, GET_MODEL, DELETE_DEVICE, UPDATE_DEVICE } from '../graphql/device'
function useDeviceQuery() {
  const [_getSensorsWithIOT, { data: dataSensorsWithIOT }] = useLazyQuery(GET_SENSORS_WITH_IOT)
  const [_getModel, { data: dataModel }] = useLazyQuery(GET_MODEL)
  const [_deleteDevices] = useMutation(DELETE_DEVICE)
  const [_updateDevice, { error }] = useMutation(UPDATE_DEVICE)

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

  const deleteDevices = useCallback(async (variables) => {
    return await _deleteDevices({
      variables
    })
  }, [_deleteDevices])

  const updateDevices = useCallback(async (variables) => {
    return await _updateDevice({
      variables
    })
  }, [_deleteDevices])

  useEffect(() => {
    console.log({ error })
  }, [error])

  return {
    getSensorsWithIOT,
    dataSensorsWithIOT,
    getModel,
    dataModel,
    deleteDevices,
    updateDevices
  }
}

export { useDeviceQuery }