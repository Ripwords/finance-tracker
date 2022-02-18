<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { updateUser } from '../functions/utility'
import { signInGoogle } from '../functions/googleSignIn'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref()
const password = ref()
const router = useRouter()
const errMessage = ref()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      updateUser()
      router.push('/menu/home')
    })
    .catch(error => {
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
      <Header title="Register" /> 
      <ion-card class="ion-padding">
        <ion-item>
          <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
        </ion-item>
        <p v-if="errMessage">{{ errMessage }}</p>
        <ion-item>
          <ion-button @click="register()">Register</ion-button>
          <ion-button @click="signInGoogle()">Sign In with Google</ion-button>
          <ion-button @click="router.replace('/menu/login')">Sign In</ion-button>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>