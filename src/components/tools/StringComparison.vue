<script setup lang="ts">
import { ref, computed } from 'vue'
import * as Diff from 'diff'

const string1 = ref('')
const string2 = ref('')
const ignoreCase = ref(false)
const trimWhitespace = ref(false)
const diffMode = ref<'chars' | 'words' | 'lines'>('chars')

const isMatch = computed(() => {
  let s1 = string1.value
  let s2 = string2.value

  if (trimWhitespace.value) {
    s1 = s1.trim()
    s2 = s2.trim()
  }

  if (ignoreCase.value) {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()
  }

  return s1 === s2
})

const diffResult = computed(() => {
  let s1 = string1.value
  let s2 = string2.value

  if (trimWhitespace.value) {
    s1 = s1.trim()
    s2 = s2.trim()
  }

  if (ignoreCase.value) {
    s1 = s1.toLowerCase()
    s2 = s2.toLowerCase()
  }

  if (diffMode.value === 'chars') {
    return Diff.diffChars(s1, s2)
  } else if (diffMode.value === 'lines') {
    return Diff.diffLines(s1, s2)
  }
  return Diff.diffWords(s1, s2)
})

const hasInput = computed(() => string1.value.length > 0 || string2.value.length > 0)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 mt-4 mx-auto max-w-4xl transition-colors" id="string-comparison">
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">String Comparison Tool</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">String 1</label>
        <textarea
          v-model="string1"
          rows="6"
          class="w-full p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow font-mono text-sm"
          placeholder="Paste first string here..."
        ></textarea>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Length: {{ string1.length }}</div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">String 2</label>
        <textarea
          v-model="string2"
          rows="6"
          class="w-full p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow font-mono text-sm"
          placeholder="Paste second string here..."
        ></textarea>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Length: {{ string2.length }}</div>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
      <label class="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" v-model="ignoreCase" class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4 bg-white dark:bg-gray-900">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Ignore Case</span>
      </label>
      <label class="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" v-model="trimWhitespace" class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 w-4 h-4 bg-white dark:bg-gray-900">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Trim Whitespace</span>
      </label>

      <div class="ml-auto flex items-center space-x-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Diff Mode:</span>
        <select v-model="diffMode" class="text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1 pl-2 pr-8">
          <option value="chars">Chars</option>
          <option value="words">Words</option>
          <option value="lines">Lines</option>
        </select>
      </div>
    </div>

    <div v-if="hasInput" class="rounded-lg p-4 font-bold text-center text-lg transition-colors mb-6"
         :class="isMatch ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 border border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 border border-red-200 dark:border-red-800'">
      {{ isMatch ? 'Strings Match!' : 'Strings Do Not Match' }}
    </div>

    <div v-if="hasInput && !isMatch" class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-300">
        Differences
      </div>
      <div class="p-4 bg-white dark:bg-gray-900 font-mono text-sm whitespace-pre-wrap break-words">
        <span v-for="(part, index) in diffResult" :key="index"
              :class="{
                'bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-200 line-through': part.removed,
                'bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-200': part.added,
                'text-gray-800 dark:text-gray-300': !part.added && !part.removed
              }">{{ part.value }}</span>
      </div>
    </div>

    <div v-if="!hasInput" class="rounded-lg p-4 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      Enter text in both fields to compare.
    </div>
  </div>
</template>
