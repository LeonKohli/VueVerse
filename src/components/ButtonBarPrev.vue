<!-- src/components/ButtonBarPrev.vue -->

<template>
    <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
            <div class="flex items-center space-x-1 sm:pr-4">
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                            <!-- SVG icon for the download button -->
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                <path
                                    d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                            </svg>
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <MenuItems
                            class="absolute right-0 z-10 w-24 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                <a @click="downloadAsMd"
                                    :class="[active ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-200', 'flex items-center block px-4 py-2 text-sm']">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span class="ml-2">.MD</span>
                                </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a @click="downloadAsHtml"
                                    :class="[active ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-200', 'flex items-center block px-4 py-2 text-sm']">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span class="ml-2">.html</span>
                                </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a @click="exportToPDF"
                                    :class="[active ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' : 'text-gray-700 dark:text-gray-200', 'flex items-center block px-4 py-2 text-sm']">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span class="ml-2">.pdf</span>
                                </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
        <button type="button" data-tooltip-target="tooltip-fullscreen"
            class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5" />
            </svg>
            <span class="sr-only">Full screen</span>
        </button>
        <div id="tooltip-fullscreen" role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Show full screen
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useMarkdownStore } from '../stores/markdownStore'
import { saveAs } from 'file-saver'
import MarkdownIt from 'markdown-it'
import html2pdf from 'html2pdf.js';

const store = useMarkdownStore()
const md = new MarkdownIt()

function downloadAsMd() {
    const blob = new Blob([store.content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "markdownfile.md");
}

function markdownToHtml() {
    const htmlContent = md.render(store.content)
    return htmlContent;
}

function downloadAsHtml() {
    const htmlContent = markdownToHtml();

    try {
        const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
        saveAs(blob, "file.html");
    } catch (error) {
        console.error("Error during HTML download: ", error);
        alert("There was an error when trying to download your file. Please try again.");
    }
}

async function exportToPDF() {
    const htmlContent = markdownToHtml();

    // Create a temporary div
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Append the temporary div to the body
    document.body.appendChild(tempDiv);

    try {
        const pdfWorker = html2pdf().from(tempDiv).set({
            margin: 1,
            filename: 'download.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        });

        // Save the PDF
        await pdfWorker.save();

    } finally {
        // Clean up the temporary div
        document.body.removeChild(tempDiv);
    }
}

</script>



  