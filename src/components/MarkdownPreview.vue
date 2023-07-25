<!-- src/components/MarkdownPreview.vue -->

<template>
  <div class="p-6 overflow-y-auto prose text-white bg-gray-900 rounded-lg shadow-lg preview dark:prose-invert" v-html="markdownContent"></div>
</template>


<style scoped>
.preview {
  min-height: 400px;
}
</style>
<script lang="ts">
import { marked } from "marked";
import { computed } from 'vue'
import { useMarkdownStore } from '../stores/markdownStore'


export default {
  setup() {
    const store = useMarkdownStore()
    const markdownContent = computed(() => marked(store.content, { mangle: false, headerIds: false }))

    return { markdownContent }
  }
}
</script>
