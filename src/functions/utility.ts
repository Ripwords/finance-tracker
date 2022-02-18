import { Router } from 'vue-router'
import { mainStore } from '../store'
import { getAuth, getRedirectResult } from 'firebase/auth'
import { hydratePiniaFromFirestore } from './hydratePinia'
import { toastController } from '@ionic/vue'

const store = mainStore()

export const updateUser = async (router?: Router, redirect?: boolean) => {
  if (router) {
    const result = await getRedirectResult(getAuth())
    if (result?.user) {
      router.replace('/menu/home')
    } else if (redirect) {
      router.replace('/menu/home')
    }
  }
  const auth = getAuth().currentUser
  if (auth) {
    store.currentUser = auth
    hydratePiniaFromFirestore()
  }
}

export const errorHandler = (error: string) => {
  console.log(error)
  switch (error) {
    case 'auth/invalid-email':
      return 'Invalid email address'
    case 'auth/user-disabled':
      return 'User has been disabled'
    case 'auth/user-not-found':
      return 'User not found'
    case 'auth/wrong-password':
      return 'Wrong password'
    case 'auth/internal-error':
      return 'Internal error'
    case 'auth/email-already-in-use':
      return 'Email address is already in use'
    case 'auth/weak-password':
      return 'Password is too weak'
    default:
      return 'Unknown error'
  }
}

export const openToast = async (msg: string | null) => {
  if (msg) {
    const toast = await toastController.create({
      message: msg,
      duration: 2500,
      color: 'danger'
    })
    toast.present()
  }
}