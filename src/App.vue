<!-- src/App.vue -->

<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  components: {
    RouterView
  }
})
</script>
