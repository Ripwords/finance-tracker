<script lang="ts" setup>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'vue-router';
import { openToast, errorHandler } from '../functions/utility'

const email = ref('')
const router = useRouter()

const forgotPassword = async () => {
  if (email.value) {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        openToast('Please check your email for a password reset link', 'success')
        setTimeout(async () => {
          await router.replace('/login')
          window.location.reload()
        }, 3000)
      })
      .catch(error => {
        openToast(errorHandler(error.code))
      })
  } else {
    openToast('Please enter an email')
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="flex justify-center mt-5">
        <ion-card class="ion-padding w-[500px] children:my-2">
          <Header title="Reset Password" /> 
          <ion-item>
            <ion-input type="text" placeholder="Email" v-model="email"></ion-input>
          </ion-item>
          <div class="flex justify-center">
            <ion-button @click="forgotPassword()">Send reset link</ion-button>
          </div>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>