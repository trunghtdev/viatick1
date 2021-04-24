import gql from 'graphql-tag'
export const GET_SENSORS_WITH_IOT = gql`
  query getSensorsWithIoT(
    $name: String,
    $model: Int,
    $serial: String,
    $mac: String,
    $region: String,
    $longitude: Float,
    $latitude: Float,
    $floor: Int,
    $distance: Float,
    $remark: String,
    $optional: AWSJSON,
    $active: Boolean,
    $date: AWSDateTim 
  ) {
    getSensorsWithIoT(
      name: $name,
      model: $model,
      serial: $serial,
      mac: $mac,
      region: $region,
      longitude: $longitude,
      latitude: $latitude,
      floor: $floor,
      distance: $distance,
      remark: $remark,
      optional: $optional,
      active: $active,
      date: $date,
    ) {
      deviceId
      application
      name
      model
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