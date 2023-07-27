<template>
  <MarkdownView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MarkdownView from './views/MarkdownView.vue'

export default defineComponent({
  name: 'App',
  components: {
    MarkdownView
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
