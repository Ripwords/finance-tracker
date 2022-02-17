<script lang="ts" setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { signInGoogle } from '../functions/googleSignIn'

const email = ref()
const password = ref()
const errMessage = ref()
const router = useRouter()

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.push('/main')
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMessage.value = 'Invalid email address'
          break
        case 'auth/user-disabled':
          errMessage.value = 'User disabled'
          break
        case 'auth/user-not-found':
          errMessage.value = 'User not found'
          break
        case 'auth/wrong-password':
          errMessage.value = 'Wrong password'
          break
        case 'auth/internal-error':
          if (!password.value) {
            errMessage.value = 'Password is required'
          } else {
            errMessage.value = 'Internal error'
          }
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
      <h1>Sign In</h1>
      <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
      <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
      <p v-if="errMessage">{{ errMessage }}</p>
      <ion-button @click="signIn()">Login</ion-button>
      <ion-button @click="signInGoogle(router)">Sign In with Google</ion-button>
    </ion-content>
  </ion-page>
</template>