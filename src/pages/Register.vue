<script lang="ts" setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { signInGoogle } from '../functions/googleSignIn'

const email = ref()
const password = ref()
const router = useRouter()
const errMessage = ref()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.push('/main')
    })
    .catch(error => {
      console.log(error)
      switch (error.code) {
        case 'auth/invalid-email':
          errMessage.value = 'Invalid email address'
          break
        case 'auth/email-already-in-use':
          errMessage.value = 'Email already in use'
          break
        case 'auth/weak-password':
          errMessage.value = 'Password is too weak'
          break
        default:
          errMessage.value = error.message
      }
    }
  )
}
</script>

<template>
  <ion-page>
    <ion-content>
      <h1>Create an Account</h1>
      <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
      <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
      <p v-if="errMessage">{{ errMessage }}</p>
      <ion-button @click="register()">Register</ion-button>
      <ion-button @click="signInGoogle(router)">Sign In with Google</ion-button>
    </ion-content>
  </ion-page>
</template>