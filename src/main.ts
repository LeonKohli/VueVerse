// src/main.ts

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'highlight.js/styles/atom-one-dark.css'
import App from './App.vue'
import EditorView from './views/EditorView.vue'
import PreviewView from './views/PreviewView.vue'
import MarkdownView from './views/MarkdownView.vue'
import hljs from 'highlight.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MarkdownView }
  ]
})

// Check for dark mode preference at the OS level
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

// Check for saved user preference
const storedThemePreference = localStorage.getItem('theme-preference')

const userPrefersDark = storedThemePreference
  ? storedThemePreference === 'dark'
  : prefersDark

// Add or remove the "dark" class based on the preference
if (userPrefersDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

const app = createApp(App)

app.directive('highlightjs', {
  beforeMount: function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement) => {
      hljs.highlightElement(block);
    });
  },
  updated: function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement) => {
      hljs.highlightElement(block);
    });
  },
});

app.use(router)
app.use(createPinia())
app.mount('#app')
