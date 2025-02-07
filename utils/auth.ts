import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

// Function to register a new user
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error("This email is already in use. Please use a different email.");
    }
    console.error("Error registering user:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Function to log in an existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the user object
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Rethrow the error for handling in the component
  }
}; 