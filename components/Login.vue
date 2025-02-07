<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loginUser } from "../utils/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    await loginUser(email.value, password.value);
    // Handle successful login (e.g., redirect or show a success message)
  } catch (err) {
    error.value = "Login failed. Please check your credentials.";
  }
};
</script>

<style scoped>
.form-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
