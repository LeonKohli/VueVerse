<!-- src/views/MarkdownView.vue -->

<template>
  <div class="flex h-screen bg-gray-700">
    <MarkdownEditor class="flex-grow" ref="editor" :style="{ width: `${editorWidth}px` }" />
    <div class="resize-bar cursor-col-resize" @mousedown="resizeStart" />
    <MarkdownPreview class="flex-grow" ref="preview" :style="{ width: `${previewWidth}px` }" />
  </div>
</template>

<style scoped>
.resize-bar {
  cursor: col-resize;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  width: 1px;
  transition: all 0.3s ease;
}

.resize-bar:hover {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
}
</style>


<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import MarkdownPreview from '../components/MarkdownPreview.vue'

export default {
  components: {
    MarkdownEditor,
    MarkdownPreview
  },
  setup() {
    const editorWidth = ref(window.innerWidth / 2)
    const previewWidth = ref(window.innerWidth / 2)




    let isResizing = false

    const resizeStart = () => {
      isResizing = true
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', resizeEnd)
    }

    const resize = (e: MouseEvent) => {

      if (!isResizing) return

      editorWidth.value = e.clientX
      previewWidth.value = window.innerWidth - e.clientX
    }

    const resizeEnd = () => {
      isResizing = false
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', resizeEnd)
    }

    onMounted(() => {
      window.addEventListener('resize', () => {
        editorWidth.value = window.innerWidth / 2
        previewWidth.value = window.innerWidth / 2
      })
    })

    onUnmounted(() => {
      window.removeEventListener('resize', () => {
        editorWidth.value = window.innerWidth / 2
        previewWidth.value = window.innerWidth / 2
      })
    })

    return {
      editorWidth,
      previewWidth,
      resizeStart
    }


  }
}
</script>
