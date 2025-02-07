<template>
  <div class="form-container">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { registerUser } from "../utils/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const register = async () => {
  try {
    await registerUser(email.value, password.value);
    // Handle successful registration (e.g., redirect or show a success message)
    error.value = ""; // Clear any previous error
  } catch (err) {
    error.value = err.message; // Set the error message from the thrown error
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