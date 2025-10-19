<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const counterStore = useCounterStore();
const { count, doubleCount } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<template>
  <div>
    <h1>Welcome to the Vue 3 App</h1>
    <p>Current Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
