<script lang="ts" setup>
import IconNames from '../components/Icons'
import { mainStore } from '../store'

const store = mainStore()
</script>

<template>
  <ion-page>
    <ion-content>
      <Header title="Home" /> 
        <ion-label class="text-size-40px">
          <div class="children:mx-2 mt-5 flex justify-center children:transform children:duration-150">
            <i-logos:ionic-icon class="hover:scale-120"></i-logos:ionic-icon>
            <i-logos:vue class="hover:scale-120"></i-logos:vue>
            <i-logos:vitejs class="hover:scale-120"></i-logos:vitejs>
          </div>
          <IconNames />
        </ion-label>
        {{ store.currentUser.email }}
        {{ store.currentUser.emailVerified }}
    </ion-content>
  </ion-page>
</template>