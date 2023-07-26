<!-- src/components/MarkdownPreview.vue -->

<template>
  <div class="flex flex-col h-screen">
    <ButtonBar />
    <div
      class="flex-grow w-full p-4 mb-4 overflow-y-auto prose text-white border border-gray-200 rounded-lg rounded-b-lg dark:prose-invert bg-gray-50 dark:border-gray-600 dark:text-white dark:bg-gray-800 markdown-preview"
      v-html="markdownContent">
    </div>
  </div>
</template>

<style scoped>
.markdown-preview.prose {
  min-height: calc(100vh - 2rem) !important;
  resize: none !important;
  overflow-y: auto !important;
  max-width: none !important;
  word-wrap: break-word !important;
}
</style>

<script lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'
import { useMarkdownStore } from '../stores/markdownStore'
import ButtonBar from './ButtonBarPrev.vue' // Import ButtonBar component

export default {
  components: {
    ButtonBar // Register ButtonBar component
  },
  setup() {
    const store = useMarkdownStore()
    const markdownContent = computed(() =>
      marked(store.content, { mangle: false, headerIds: false })
    )

    return { markdownContent }
  }
}
</script>
