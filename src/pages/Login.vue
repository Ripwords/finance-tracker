<script lang="ts" setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { signInGoogle } from '../functions/googleSignIn'
import { updateUser } from '../functions/utility';

const email = ref()
const password = ref()
const errMessage = ref()
const router = useRouter()

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      updateUser()
      router.push('/menu/home')
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
          errMessage.value = null
      }
    }
  )
}
</script>

<template>
  <ion-page>
    <ion-content>
      <Header title="Sign In" /> 
      <ion-card class="ion-padding">
        <ion-item>
          <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
        </ion-item>
        <p v-if="errMessage">{{ errMessage }}</p>
        <ion-item>
          <ion-button @click="signIn()">Login</ion-button>
          <ion-button @click="errMessage = signInGoogle(router)">Sign In with Google</ion-button>
          <ion-button @click="router.replace('/menu/register')">Sign Up</ion-button>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>