<!-- src/components/MarkdownEditor.vue -->

<template>
    <form class="flex flex-col h-screen">
        <ButtonBar :formatCode="formatCode" />
        <div
            class="flex-grow w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label for="editor" class="sr-only">Publish post</label>
                <textarea ref="textarea" v-model="content" id="editor"
                    class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write here..." required></textarea>
            </div>
        </div>
    </form>
</template>

  

<style scoped>
textarea {
    min-height: calc(100vh - 2rem);
    /* take full height, reduce the space for padding and margin */
    resize: none;
    /* prevent user resizing */
    overflow-y: auto;
    /* enable vertical scrolling */
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
  