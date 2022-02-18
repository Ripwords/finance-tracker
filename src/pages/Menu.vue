<script lang="ts" setup>
import { mainStore } from '../store'
import { menuController } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'
import { Auth, getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

let auth: Auth
const route = useRoute()
const store = mainStore()
const router = useRouter()
const isLoggedIn = ref(false)
const isActive = (path: string) => path === route.fullPath

const logout = () => {
  signOut(auth).then(() => {
    store.currentUser = {}
    store.userData = {}
    router.push('/')
    window.location.reload()
    menuController.close('main')
  })
}


onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, user => {
    isLoggedIn.value = user ? true : false
  })
})
</script>

<template>
  <ion-split-pane content-id="main">
    <ion-menu content-id="main" menu-id="main">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <i-carbon:money></i-carbon:money>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" class="children:noSelect">
            <ion-item
              :class="{ active: isActive('/menu/home') }"
              @click="router.replace('/menu/home')"
            >
              <i-carbon:currency></i-carbon:currency>&nbsp;&nbsp;Expenses
            </ion-item>
            <ion-item
              :class="{ active: isActive('/menu/statistics') }"
              @click="router.replace('/menu/statistics')"
            >
              <i-carbon:currency></i-carbon:currency>&nbsp;&nbsp;Statistics
            </ion-item>
            <ion-item
              :class="{ active: isActive('/menu/categories') }"
              @click="router.replace('/menu/categories')"
            >
              <i-carbon:currency></i-carbon:currency>&nbsp;&nbsp;Categories
            </ion-item>
            <ion-item
              :class="{ active: isActive('/menu/accounts') }"
              @click="router.replace('/menu/accounts')"
            >
              <i-carbon:currency></i-carbon:currency>&nbsp;&nbsp;Accounts
            </ion-item>
            <ion-item
              :class="{ active: isActive('/menu/settings') }"
              @click="router.replace('/menu/settings')"
            >
              <i-carbon:currency></i-carbon:currency>&nbsp;&nbsp;Settings
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
      <ion-footer mode="md">
        <ion-toolbar>
          <ion-item>
            <ion-button @click="logout">Logout</ion-button>
          </ion-item>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
    <ion-router-outlet id="main"></ion-router-outlet>
  </ion-split-pane>
</template>

<style scoped>
.active {
  color: var(--ion-color-primary);
}

.active-link {
  --ion-text-color: var(--ion-color-primary);
}
</style>