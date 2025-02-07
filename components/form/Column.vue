<template>
  <div
    :class="isCreatingColumn ? '' : 'cursor-pointer hover:text-indigo-600'"
    class="w-80 h-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-charcoal text-2xl font-bold text-marengo transition-colors"
    @click.self="() => (isCreatingColumn = true)"
  >
    + New Column

    <transition name="fade">
      <div
        v-if="isCreatingColumn"
        class="mt-10 flex flex-col justify-center text-base font-semibold text-marengo"
      >
        <input
          type="text"
          v-model="newColumnName"
          @keyup.enter="createColumn"
          autofocus
        />
        <div class="flex justify-between gap-5 mt-4">
          <Button
            label="Create Column"
            @action="createColumn"
            class="bg-savoy"
          />
          <button @click="() => (isCreatingColumn = false)">
            <XMarkIcon class="w-10 h-10" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useKanbanStore } from "~~/stores";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Button from "../base/Button.vue";

const store = useKanbanStore();

//Route
const route = useRoute();
const boardId = route.params.board.toString();

//Refs
const isCreatingColumn = ref<boolean>(false);
const newColumnName = ref<string>("");

//Methods
const createColumn = (): void => {
  if (newColumnName.value.trim()) {
    store.createNewColumn(boardId, newColumnName.value);
    newColumnName.value = "";
    isCreatingColumn.value = false;
  } else {
    console.error("Column name cannot be empty");
  }
};
</script>
