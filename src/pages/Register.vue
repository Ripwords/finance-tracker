<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { updateUser } from '../functions/utility'
import { signInGoogle } from '../functions/googleSignIn'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref()
const password = ref()
const router = useRouter()
const errMessage = ref()
const { enter } = useMagicKeys()

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      updateUser(router, true)
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

watch(enter, () => {
  if (email.value && password.value) {
    register()
  }
})

updateUser(router)
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="flex justify-center mt-5">
        <ion-card class="ion-padding w-[500px]">
          <Header title="Register" /> 
          <ion-item>
            <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input type="password" placeholder="Password" v-model="password"></ion-input>
          </ion-item>
          <ion-item>
            <ion-button @click="register()">Register</ion-button>
            <ion-button @click="errMessage = signInGoogle()">&nbsp;<i-carbon:logo-google></i-carbon:logo-google>&nbsp;</ion-button>
          </ion-item>
          <div class="flex justify-end mt-3 text-size-[12px]">
            <p>Already have an account?
              <button @click="router.replace('/login')"><a>Login here</a></button>
            </p>
          </div>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>