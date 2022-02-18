<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { signInGoogle } from '../functions/googleSignIn'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { errorHandler, updateUser, openToast } from '../functions/utility'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const router = useRouter()
const { enter } = useMagicKeys()
const seePassword = ref(false)

const reset = () => {
  email.value = ''
  password.value = ''
  passwordConfirm.value = ''
}

const register = async () => {
  if (email.value == '' || password.value == '' || passwordConfirm.value == '') {
    await openToast('Please fill in all fields')
  } else if (password.value !== passwordConfirm.value) {
    await openToast('Passwords do not match')
  } else {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(() => {
        updateUser(router, true)
      })
      .catch(error => {
        reset()
        openToast(errorHandler(error.code))
      }
    )
  }
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
        <ion-card class="ion-padding w-[500px] children:my-2">
          <Header title="Register" /> 
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
          <ion-item>
            <ion-input v-if="!seePassword" type="password" placeholder="Confirm Password" v-model="password"></ion-input>
            <ion-input v-else type="text" placeholder="Confirm Password" v-model="passwordConfirm"></ion-input>
            <div @click="seePassword = !seePassword">
              <i-carbon:view v-if="!seePassword"></i-carbon:view>
              <i-carbon:view-off v-else></i-carbon:view-off>
            </div>
          </ion-item>
          <div class="flex justify-center">
            <ion-button @click="register()">Register</ion-button>
            <ion-button @click="signInGoogle()">&nbsp;<i-carbon:logo-google></i-carbon:logo-google>&nbsp;</ion-button>
          </div>
          <div class="flex justify-end mt-3 text-size-[12px]">
            <p>Already have an account?
              <button @click="reset(); router.replace('/login')"><a>Login here</a></button>
            </p>
          </div>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>