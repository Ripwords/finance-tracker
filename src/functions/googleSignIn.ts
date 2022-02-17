import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { updateUser } from './utility'
import { Router } from 'vue-router'

export const signInGoogle = async (router: Router) => {
  const provider = new GoogleAuthProvider()
  // signInWithPopup(getAuth(), provider).then(() => {
  //   updateUser()
  //   router.push('/menu/home')
  // }).catch(error => {
  //   let errMessage
  //   switch (error.code) {
  //     case 'auth/invalid-email':
  //       errMessage = 'Invalid email address'
  //       break
  //     case 'auth/user-disabled':
  //       errMessage = 'User disabled'
  //       break
  //     case 'auth/user-not-found':
  //       errMessage = 'User not found'
  //       break
  //     case 'auth/wrong-password':
  //       errMessage = 'Wrong password'
  //       break
  //     case 'auth/internal-error':
  //       errMessage = 'Internal Error'
  //       break
  //     default:
  //       errMessage = error.message
  //   }
  //   return errMessage
  // })
  const auth = getAuth()
  await signInWithRedirect(auth, provider)
}