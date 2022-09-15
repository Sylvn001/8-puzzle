<template>
  <Puzzle />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Puzzle from "./pages/Puzzle.vue";

export default defineComponent({
  name: "App",
  components: {
    Puzzle,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  color: white;
}

body {
  background: #333333;
}
</style>
