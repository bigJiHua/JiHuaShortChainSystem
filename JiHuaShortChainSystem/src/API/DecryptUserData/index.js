import { app } from '@/main'
export default function DecryptUserData (DecryptData) {
  return app.$crypto.AES.encrypt(JSON.stringify(DecryptData), 'secret key 123').toString()
}
