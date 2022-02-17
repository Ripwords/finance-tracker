<script lang="ts" setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { signInGoogle } from '../functions/googleSignIn'
import { hydratePiniaFromFirestore } from '../functions/hydratePinia'
import { mainStore } from '../store'

const email = ref()
const password = ref()
const store = mainStore()
const router = useRouter()
const errMessage = ref()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((result) => {
      hydratePiniaFromFirestore()
      store.currentUser = result.user
      router.push('/menu/home')
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
          <ion-button @click="signInGoogle(router)">Sign In with Google</ion-button>
          <ion-button @click="router.replace('/menu/login')">Sign In</ion-button>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>