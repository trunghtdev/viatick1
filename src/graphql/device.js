import gql from 'graphql-tag'

export const GET_MODEL = gql`
  query getModel($modelId: Int) {
    getModel(modelId: $modelId) {
      modelId
      name
      type
    }
  }
`

export const DELETE_DEVICE = gql`
  mutation deleteDevices($type: String, $deviceIds: [Int]!) {
    deleteDevices(type: $type, deviceIds: $deviceIds) {
      rows_deleted
    }
  }
`

export const UPDATE_DEVICE = gql`
  mutation updateDevice($input: DeviceUpdateInput!) {
    updateDevice(input: $input) {
      deviceId
      application {
        applicationId
      }
      name
      model {
        modelId
      }
      serial
      mac
      region
      longitude
      latitude
      floor
      distance
      remark
      optional
      active
      date
      live
      battery
      humidity
      temperature
      height
      maxHeight
      x
      y
      z
      tags
      deploymentDate
      compositionData
      unicastAddr
      meshStatus
      status
      error
      lockStatus
      network
      frequency
      server
    }
  }
`

export const GET_SENSORS_WITH_IOT = gql`
  query getSensorsWithIOT($filter: FilterDevice) {
    getSensorsWithIOT(filter: $filter) {
      deviceId
      application {
        applicationId
      }
      name
      model {
        modelId
      }
      serial
      mac
      region
      longitude
      latitude
      floor
      distance
      remark
      optional
      active
      date
      live
      battery
      humidity
      temperature
      height
      maxHeight
      x
      y
      z
      tags
      deploymentDate
      compositionData
      unicastAddr
      meshStatus
      status
      error
      lockStatus
      network
      frequency
      server
  }
}
`