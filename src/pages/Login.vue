<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { signInGoogle } from '../functions/googleSignIn'
import { errorHandler, updateUser, openToast } from '../functions/utility'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref()
const password = ref()
const seePassword = ref(false)
const router = useRouter()
const { enter } = useMagicKeys()

const reset = () => {
  email.value
  password.value
}

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      updateUser(router, true)
    })
    .catch(error => {
      reset()
      openToast(errorHandler(error.code))
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
        <ion-card class="ion-padding w-[500px] children:my-2">
          <Header title="Sign In" /> 
          <ion-item>
            <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input v-if="!seePassword" type="password" placeholder="Password" v-model="password"></ion-input>
            <ion-input v-else type="text" placeholder="Password" v-model="password"></ion-input>
            <div @click="seePassword = !seePassword">
              <i-carbon:view v-if="!seePassword"></i-carbon:view>
              <i-carbon:view-off v-else></i-carbon:view-off>
            </div>
          </ion-item>
          <div class="flex justify-center">
            <ion-button @click="signIn()">Login</ion-button>
            <ion-button @click="signInGoogle()">&nbsp;<i-carbon:logo-google></i-carbon:logo-google>&nbsp;</ion-button>
          </div>
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