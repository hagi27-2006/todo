<template>
  <div class="account-settings">
    <h2>Account Settings</h2>
    <form @submit.prevent="updateAccount">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="Email" required />
      </div>
      <div>
        <label for="password">New Password</label>
        <input
          v-model="newPassword"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="New Password"
          @input="checkPasswordStrength"
        />
        <button type="button" @click="togglePasswordVisibility">
          {{ passwordVisible ? 'Hide' : 'Show' }}
        </button>
        <p v-if="passwordStrengthMessage">{{ passwordStrengthMessage }}</p>
      </div>
      <div>
        <label for="confirmPassword">Confirm New Password</label>
        <input
          v-model="confirmPassword"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="Confirm New Password"
        />
      </div>
      <button type="submit" :disabled="loading">Update Account</button>
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import app from "../utils/firebaseConfig";

const auth = getAuth(app);
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");
const loading = ref(false);
const passwordVisible = ref(false);
const passwordStrengthMessage = ref("");

onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    email.value = user.email || ""; // Set the current email
  }
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const checkPasswordStrength = () => {
  const strength = getPasswordStrength(newPassword.value);
  passwordStrengthMessage.value = strength;
};

const getPasswordStrength = (password) => {
  if (password.length < 6) return "Password is too short.";
  if (!/[A-Z]/.test(password)) return "Add at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Add at least one number.";
  if (!/[!@#$%^&*]/.test(password)) return "Add at least one special character.";
  return "Password is strong.";
};

const updateAccount = async () => {
  try {
    loading.value = true; // Set loading state
    const user = auth.currentUser;
    if (user) {
      // Update email if it has changed
      if (email.value !== user.email) {
        await updateEmail(user, email.value);
      }
      // Update password if provided and matches confirmation
      if (newPassword.value && newPassword.value === confirmPassword.value) {
        await updatePassword(user, newPassword.value);
      }
      success.value = "Account updated successfully!";
      error.value = ""; // Clear any previous error
    }
  } catch (err) {
    error.value = "Error updating account: " + err.message;
    success.value = ""; // Clear any previous success message
  } finally {
    loading.value = false; // Reset loading state
  }
};
</script>

<style scoped>
.account-settings {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style> 