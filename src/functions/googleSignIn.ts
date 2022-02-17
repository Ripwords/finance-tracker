import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { Router } from 'vue-router'

export const signInGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  await signInWithRedirect(auth, provider)
}