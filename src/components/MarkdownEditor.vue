<!-- src/components/MarkdownEditor.vue -->

<template>
    <form class="flex flex-col h-screen">
        <ButtonBar :formatCode="formatCode" />
        <div
            class="flex-grow w-full mb-4 prose border border-gray-200 markdown-edit dark:prose-invert bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-6 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label for="editor" class="sr-only">Publish post</label>
                <textarea ref="textarea" v-model="content" id="editor"
                    class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write here..." required></textarea>
            </div>
        </div>
    </form>
</template>

  

<style scoped>
.markdown-edit.prose {
    min-height: calc(100vh - 2rem) !important;
    resize: none !important;
    overflow-y: auto !important;
    max-width: none !important;
    word-wrap: break-word !important;
}

textarea {
    min-height: calc(100vh - 2rem) !important;
    resize: none !important;
    max-width: none !important;
    word-wrap: break-word !important;
}
</style>


<script lang="ts">
import { ref, watch } from 'vue'
import { useMarkdownStore } from '../stores/markdownStore'
import ButtonBar from './ButtonBarEdit.vue';

export default {
    components: {
        ButtonBar
    },

    setup() {
        const store = useMarkdownStore()
        const content = ref(store.content)
        const textarea = ref<HTMLTextAreaElement | null>(null)

        watch(content, (newContent) => {
            store.setContent(newContent)
        })

        const formatCode = () => {
            if (textarea.value) {
                const start = textarea.value.selectionStart
                const end = textarea.value.selectionEnd
                const selectedText = textarea.value.value.substring(start, end)
                const formattedText = '```\n' + selectedText + '\n```'
                textarea.value.value =
                    textarea.value.value.substring(0, start) + formattedText + textarea.value.value.substring(end)
                textarea.value.dispatchEvent(new Event('input'))
                textarea.value.focus()
                console.log(formattedText)
            }
        }

        // implement other methods here

        return {
            content,
            textarea,
            formatCode,
            // include other methods here 
        }
    },
}
</script>
  