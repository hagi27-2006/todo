<template>
  <div>
    <Login v-if="!user" />
    <Register v-if="!user" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./utils/firebaseConfig";
import HeaderComponent from "./components/HeaderComponent.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const auth = getAuth(app);
const user = ref(null);

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser; // Update user state based on authentication status
  });
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.tasks-enter-from {
  opacity: 0;
  transform: scale(0.75);
}
.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}
.tasks-enter-active {
  transition: all 0.5s ease;
}
</style>