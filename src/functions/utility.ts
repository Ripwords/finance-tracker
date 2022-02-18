import { Router } from 'vue-router'
import { mainStore } from '../store'
import { getAuth, getRedirectResult } from 'firebase/auth'
import { hydratePiniaFromFirestore } from './hydratePinia'

const store = mainStore()

export const updateUser = async (router?: Router) => {
  if (router) {
    const result = await getRedirectResult(getAuth())
    if (result?.user) {
      router.replace('/menu/home')
    }
  }
  const auth = getAuth().currentUser
  if (auth) {
    store.currentUser = auth
    hydratePiniaFromFirestore()
  }
}