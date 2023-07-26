// src/main.ts

// import the necessary packages
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'highlight.js/styles/atom-one-dark.css'
import App from './App.vue'
import MarkdownView from './views/MarkdownView.vue'
import hljs from 'highlight.js'

const addButtons = function (el: HTMLElement) {
  const blocks = el.querySelectorAll('pre')
  blocks.forEach((block: HTMLElement) => {
    const codeBlock = block.querySelector('code')

    // Check if codeBlock is not null
    if (codeBlock) {
      // Extract language from class attribute
      const language = codeBlock.className.split(' ').find((className: string) => className.startsWith('language-'))?.replace('language-', '') || '';

      // Create button container
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'absolute top-0 right-0 flex justify-end px-2 py-1 bg-gray-900 bg-opacity-75 rounded-tr-lg rounded-bl'

      // Create language label
      const langLabel = document.createElement('span')
      langLabel.innerText = language
      langLabel.className = 'absolute top-0 left-0 px-2 py-1 text-xs text-gray-200 bg-gray-900 bg-opacity-75 rounded-bl-lg'
      block.appendChild(langLabel)

      // Create copy button
      const copyButton = document.createElement('button')
      copyButton.className = 'mr-2 text-gray-200 hover:text-green-400'
      copyButton.title = 'Copy to clipboard'

      // Create SVG and text container
      const svgTextContainer = document.createElement('span')
      svgTextContainer.className = 'flex items-center'
      svgTextContainer.innerHTML = `
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
    <span> Copy Code</span>
`

      copyButton.appendChild(svgTextContainer)

      // Create "Copied" indicator
      const copiedIndicator = document.createElement('span')
      copiedIndicator.innerText = 'Copied ✔️'
      copiedIndicator.className = 'absolute invisible px-2 py-1 mt-2 text-xs text-white transform -translate-x-1/2 bg-green-500 rounded top-full left-1/2'
      copyButton.appendChild(copiedIndicator)

      copyButton.addEventListener('click', function () {
        navigator.clipboard.writeText(codeBlock.innerText)
          .then(() => {
            copiedIndicator.classList.remove('invisible')
            setTimeout(() => copiedIndicator.classList.add('invisible'), 2000)
          })
          .catch(err => console.error('Failed to copy text: ', err))
      })

      // Append buttons to button container
      buttonContainer.appendChild(copyButton)

      // Append button container to block
      block.style.position = 'relative'
      block.prepend(buttonContainer)
    }
  })
}

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
  beforeMount: function (el: HTMLElement) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: Element) => {
      hljs.highlightElement(block as HTMLElement);
    });
    addButtons(el)
  },
  updated: function (el: HTMLElement) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: Element) => {
      hljs.highlightElement(block as HTMLElement);
    });
    addButtons(el)
  },
});

app.use(router)
app.use(createPinia())
app.mount('#app')
