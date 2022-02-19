<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMagicKeys } from '@vueuse/core'
import { signInGoogle } from '../functions/googleSignIn'
import { errorHandler, updateUser, openToast } from '../functions/utility'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const router = useRouter()
const { enter } = useMagicKeys()
const seePassword = ref(false)

const reset = () => {
  email.value = ''
  password.value = ''
  passwordConfirm.value = ''
  loading.value = false
}

const verifyEmail = async (user: any) => {
  await sendEmailVerification(user, {
    url: import.meta.env.PROD ? 'https://fitracker.netlify.app/' : 'http://localhost:3000/'
  })
}

const register = async () => {
  if (email.value == '' || password.value == '' || passwordConfirm.value == '') {
    await openToast('Please fill in all fields')
  } else if (password.value !== passwordConfirm.value) {
    await openToast('Passwords do not match')
  } else {
    try {
      loading.value = true
      const created = await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      if (getAuth().currentUser && created) {
        await openToast('Please check your email for a verification link', 'success')
        await verifyEmail(getAuth().currentUser)
      } else {
        return
      }
    } catch (error: any) {
      await openToast(errorHandler(error.code))
    }
    reset()
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
          <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
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
            <ion-input v-if="!seePassword" type="password" placeholder="Confirm Password" v-model="passwordConfirm"></ion-input>
            <ion-input v-else type="text" placeholder="Confirm Password" v-model="passwordConfirm"></ion-input>
            <div @click="seePassword = !seePassword">
              <i-carbon:view v-if="!seePassword"></i-carbon:view>
              <i-carbon:view-off v-else></i-carbon:view-off>
            </div>
          </ion-item>
          <div class="flex justify-center">
            <ion-button @click="register()">
              <div v-if="!loading" class="w-[80px]">Register</div>
              <div v-else class="w-[80px]">
                <ion-spinner name="crescent"></ion-spinner>
              </div>
            </ion-button>
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