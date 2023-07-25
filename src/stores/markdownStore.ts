// src/stores/markdownStore.ts

import { defineStore } from 'pinia'

export const useMarkdownStore = defineStore({
  id: 'markdown',
  state: () => ({
    content: ''
  }),
  actions: {
    setContent(newContent: string) {
      this.content = newContent;
    }
  }
})
