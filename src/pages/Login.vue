<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { updateUser } from '../functions/utility'
import { signInGoogle } from '../functions/googleSignIn'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref()
const password = ref()
const errMessage = ref()
const router = useRouter()
const { enter } = useMagicKeys()

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      updateUser(router, true)
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

watch(enter, () => {
  if (email.value && password.value) {
    signIn()
  }
})

updateUser(router)
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="flex justify-center mt-5">
        <ion-card class="ion-padding w-[500px]">
          <Header title="Sign In" /> 
          <ion-item>
            <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-button @click="signIn()">Login</ion-button>
            <ion-button @click="errMessage = signInGoogle()">&nbsp;<i-carbon:logo-google></i-carbon:logo-google>&nbsp;</ion-button>
          </ion-item>
          <div class="flex justify-end mt-3 text-size-[12px]">
            <p>Don't have an account?
              <button @click="router.replace('/register')"><a>Register here</a></button>
            </p>
          </div>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>