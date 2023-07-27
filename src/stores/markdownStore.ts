// src/stores/markdownStore.ts

import { defineStore } from 'pinia'

export const useMarkdownStore = defineStore({
  id: 'markdown',
  state: () => ({
    content: '',
    isFullscreen: false,
    fullscreenComponent: '',
  }),
  actions: {
    setContent(newContent: string) {
      this.content = newContent
    },
    toggleFullscreen(component: 'editor' | 'preview') {
      this.isFullscreen = !this.isFullscreen;
      this.fullscreenComponent = component;
      console.log("Toggle Fullscreen", this.isFullscreen, this.fullscreenComponent);
    },
    fullscreenEditor() {
      this.toggleFullscreen('editor');
    },
    fullscreenPreview() {
      this.toggleFullscreen('preview');
    },
  }
})
