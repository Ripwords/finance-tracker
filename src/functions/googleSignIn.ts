import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const signInGoogle = (router: any) => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider).then(() => {
    router.push('/main')
  }).catch(error => {
    alert(error.message)
  })
}