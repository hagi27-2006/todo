<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input v-model="taskName" type="text" placeholder="Task Name" required />
      <input v-model="taskTime" type="time" placeholder="Task Time" required />
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKanbanStore } from "~~/stores";

const store = useKanbanStore();
const taskName = ref("");
const taskTime = ref("");

const addTask = () => {
  const newTask = {
    name: taskName.value,
    time: taskTime.value,
    // Other task properties
  };
  store.createNewTask(newTask); // Assuming you have a method to create a new task
  taskName.value = "";
  taskTime.value = "";
};
</script> 