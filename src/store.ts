import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', {
  state: () => ({
    currentUser: {} as any,
    userData: {} as any
  })
})