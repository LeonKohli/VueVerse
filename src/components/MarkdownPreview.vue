<!-- src/components/MarkdownPreview.vue -->

<template>
  <div class="flex flex-col h-screen">
    <ButtonBar />
    <div
      class="flex-grow w-full p-6 prose text-white border border-gray-200 dark:prose-invert bg-gray-50 dark:border-gray-600 dark:text-white dark:bg-gray-800 markdown-preview"
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
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import tasks from 'markdown-it-task-lists'
import container from 'markdown-it-container'
import toc from 'markdown-it-table-of-contents'
import math from 'markdown-it-math'
import anchor from 'markdown-it-anchor'
import mermaid from '@liradb2000/markdown-it-mermaid'
import highlightjs from 'markdown-it-highlightjs'
import miMultimdTable from 'markdown-it-multimd-table'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbr from 'markdown-it-abbr'
import checkbox from 'markdown-it-checkbox'


import { useMarkdownStore } from '../stores/markdownStore'
import ButtonBar from './ButtonBarPrev.vue' // Import ButtonBar component



export default {
  components: {
    ButtonBar // Register ButtonBar component
  },
  setup() {
    const store = useMarkdownStore()

    const md = new MarkdownIt(({ typographer: true }))
      .use(emoji)
      .use(tasks)
      .use(toc)
      .use(mermaid)
      .use(math)
      .use(miMultimdTable, {
        enableMultilineRows: true,
        enableRowspan: true,
        multiline: true,
        rowspan: true,
        headerless: true,
        multibody: true,
        aotolabel: true,
      })
      .use(anchor)
      .use(highlightjs, { inline: true })
      .use(footnote)      // use footnote plugin
      .use(deflist)       // use definition list plugin
      .use(abbr)          // use abbreviations plugin
      .use(checkbox)      // use checkbox plugin
      .use(container, 'spoiler', {
        validate: function (params) {
          return params.trim().match(/^spoiler\s+(.*)$/)
        },
        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)

          if (tokens[idx].nesting === 1) {
            // opening tag
            return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
          } else {
            // closing tag
            return '</details>\n'
          }
        }
      })
    const markdownContent = computed(() =>
      md.render(store.content)
    )

    return { markdownContent }
  }
}



</script>


