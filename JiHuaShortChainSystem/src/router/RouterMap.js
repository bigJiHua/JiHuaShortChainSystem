/* Page */
import Login from '@/components/Page/Login'
import Register from '@/components/Page/Register'
import Jump from '@/components/Page/Jump'
/* components */
import ControlPanel from '@/components/ControlPanel/ControlPanel'
import shortenImmediately from '@/components/ControlPanel/linkShortening/shortenImmediately'
import encryptedShortening from '@/components/ControlPanel/linkShortening/encryptedShortening'
import timeLimitShortened from '@/components/ControlPanel/linkShortening/timeLimitShortened'
import myShortChain from '@/components/ControlPanel/ShortChainStatistics/myShortChain'
import ShortLinkClicks from '@/components/ControlPanel/ShortChainStatistics/ShortLinkClicks'
import systemSettings from '@/components/ControlPanel/systemSettings/systemSettings'

export default [
  {
    path: '/',
    name: 'index',
    component: Login
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/ControlPanel',
    name: 'ControlPanel',
    component: ControlPanel,
    redirect: '/ControlPanel/shortenImmediately',
    children: [
      {
        path: 'shortenImmediately',
        name: 'shortenImmediately',
        component: shortenImmediately
      }, {
        path: 'encryptedShortening',
        name: 'encryptedShortening',
        component: encryptedShortening
      }, {
        path: 'timeLimitShortened',
        name: 'timeLimitShortened',
        component: timeLimitShortened
      }, {
        path: 'myShortChain',
        name: 'myShortChain',
        component: myShortChain
      }, {
        path: 'ShortLinkClicks',
        name: 'ShortLinkClicks',
        component: ShortLinkClicks
      }, {
        path: 'systemSettings',
        name: 'systemSettings',
        component: systemSettings
      }
    ]
  }, {
    path: '/:code',
    name: 'Jump',
    component: Jump
  }

]
