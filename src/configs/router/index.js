import Home from '../../pages/home'

// Auth
import Auth from '../../pages/authentication'
import Login from '../../pages/authentication/login'
import SignUp from '../../pages/authentication/signUp'
// User
import Profile from '../../pages/profile'
// End Device
import SensorTemp from '../../pages/endDevice/sensorTemp'

export const routersNoConnection = [

]

export const routersConnection = [
  {
    hideTabBar: false,
    hideNavBar: false,
    initial: false,
    path: '/home',
    key: 'home',
    Component: Home
  },
  {
    hideTabBar: true,
    hideNavBar: true,
    initial: false,
    path: '/login',
    key: 'login',
    Component: Login
  },
  {
    hideTabBar: true,
    hideNavBar: true,
    initial: false,
    path: '/signUp',
    key: 'signUp',
    Component: SignUp
  },
  {
    hideTabBar: true,
    hideNavBar: true,
    initial: false,
    path: '/auth',
    key: 'auth',
    Component: Auth
  },
  {
    hideTabBar: false,
    hideNavBar: false,
    initial: false,
    path: '/profile',
    key: 'profile',
    Component: Profile
  },
  {
    hideTabBar: true,
    hideNavBar: true,
    initial: false,
    path: '/sensorTemp',
    key: 'sensorTemp',
    Component: SensorTemp
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
