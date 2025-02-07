<template>
  <div>
    <h2>Your Boards</h2>
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <button @click="filterBoards">Filter</button>
    <div v-for="board in filteredBoards" :key="board.id">
      <h3>{{ board.name }}</h3>
      <!-- Other board details -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useKanbanStore } from "~~/stores";

const store = useKanbanStore();
const { boards } = storeToRefs(store);

const startDate = ref("");
const endDate = ref("");

const filteredBoards = computed(() => {
  return boards.value.filter(board => {
    const boardDate = new Date(board.createdAt); // Assuming boards have a createdAt field
    return (!startDate.value || boardDate >= new Date(startDate.value)) &&
           (!endDate.value || boardDate <= new Date(endDate.value));
  });
});

const filterBoards = () => {
  // This will automatically update filteredBoards due to the computed property
};
</script> 