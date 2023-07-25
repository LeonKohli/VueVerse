<!-- src/views/MarkdownView.vue -->

<template>
  <div class="flex h-screen p-10 bg-gray-700">
    <MarkdownEditor class="w-1/2 mr-6" />
    <MarkdownPreview class="w-1/2 ml-6" />
  </div>
</template>

<script lang="ts">
import MarkdownEditor from '../components/MarkdownEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'

export default {
  components: {
    MarkdownEditor,
    MarkdownPreview
  }
}
</script>

<style scoped>
</style>
