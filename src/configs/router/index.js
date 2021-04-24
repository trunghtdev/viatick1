import Home from '../../pages/home'

export const routersNoConnection = [

]

export const routersConnection = [
  {
    hideTabBar: false,
    hideNavBar: false,
    initial: true,
    path: '/home',
    key: 'home',
    Component: Home
  }
  // {
  //   hideTabBar: false,
  //   hideNavBar: false,
  //   initial: false,
  //   path: '/devicesFound',
  //   key: 'devicesFound',
  //   Component: DevicesFound
  // }
]
