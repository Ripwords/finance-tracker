import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'

export const signInGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  await signInWithRedirect(auth, provider)
}