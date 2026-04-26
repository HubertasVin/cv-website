<script setup lang="ts">
import { ref, watch } from 'vue'
import yaml from 'js-yaml'
import * as toml from 'smol-toml'
import ini from 'ini'

const input = ref('')
const output = ref('')
const inputFormat = ref('auto')
const outputFormat = ref('json')
const error = ref('')
const success = ref(false)

let debounceTimer: any = null
watch([input, inputFormat, outputFormat], () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    processData()
  }, 300)
})

const processData = () => {
  error.value = ''
  output.value = ''
  success.value = false

  if (!input.value.trim()) {
    return
  }

  let parsedObj: any = null

  try {
    switch (inputFormat.value) {
      case 'json':
        parsedObj = JSON.parse(input.value)
        break
      case 'yaml':
        parsedObj = yaml.load(input.value)
        break
      case 'toml':
        parsedObj = toml.parse(input.value)
        break
      case 'ini':
        parsedObj = ini.parse(input.value)
        break
      case 'auto': {
        // Heuristics:
        // - If input clearly starts with '{' or '[', prefer JSON and surface JSON errors.
        // - Otherwise try JSON first, then YAML (with a guard against line-tokenized maps),
        //   then TOML, then INI.
        const trimmed = input.value.trim()
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          try {
            parsedObj = JSON.parse(input.value)
          } catch (jsonErr) {
            // If it looked like JSON but failed, surface the JSON error instead of falling back
            throw jsonErr
          }
        } else {
          try {
            parsedObj = JSON.parse(input.value)
          } catch (jsonErr) {
            try {
              parsedObj = yaml.load(input.value)
              // Guard: some broken JSON or line-by-line text is parsed by YAML into an object
              // where keys are raw lines. Detect suspicious keys and treat as non-YAML.
              if (parsedObj && typeof parsedObj === 'object') {
                const keys = Object.keys(parsedObj)
                const suspicious = keys.some(
                  (k) => /[\{\}\[\]]/.test(k) || k.includes(': ') || k.trim().endsWith(','),
                )
                if (suspicious) {
                  // prefer reporting the JSON error in this case
                  throw jsonErr
                }
              }
            } catch {
              try {
                parsedObj = toml.parse(input.value)
              } catch {
                try {
                  parsedObj = ini.parse(input.value)
                } catch {
                  throw jsonErr || new Error('Could not automatically determine valid data format.')
                }
              }
            }
          }
        }
        break
      }
    }

    if (parsedObj === null || typeof parsedObj !== 'object') {
      throw new Error('Parsed result is not a valid structured object.')
    }

    switch (outputFormat.value) {
      case 'json':
        output.value = JSON.stringify(parsedObj, null, 2)
        break
      case 'yaml':
        output.value = yaml.dump(parsedObj)
        break
      case 'toml':
        output.value = toml.stringify(parsedObj)
        break
      case 'ini':
        output.value = ini.stringify(parsedObj)
        break
    }

    success.value = true
  } catch (err: any) {
    error.value = err.message || 'An error occurred during parsing or formatting.'
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 mt-4 mx-auto max-w-4xl transition-colors"
    id="data-formatter"
  >
    <h2
      class="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2"
    >
      Data Formatter & Validator
    </h2>
    <div
      class="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700"
    >
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Input:</label>
        <select
          v-model="inputFormat"
          class="text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1 pl-2 pr-8"
        >
          <option value="auto">Auto-Detect</option>
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="toml">TOML</option>
          <option value="ini">INI</option>
        </select>
      </div>
      <div class="flex items-center space-x-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Output:</label>
        <select
          v-model="outputFormat"
          class="text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-1 pl-2 pr-8"
        >
          <option value="json">JSON</option>
          <option value="yaml">YAML</option>
          <option value="toml">TOML</option>
          <option value="ini">INI</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="flex flex-col h-full">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Input Data</label
        >
        <textarea
          v-model="input"
          rows="16"
          class="w-full flex-grow p-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow font-mono text-sm whitespace-pre md:min-h-[400px] lg:min-h-[600px]"
          placeholder="Paste your JSON, YAML, TOML, or INI here..."
        ></textarea>
      </div>
      <div class="flex flex-col h-full">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Formatted Output</label
        >
        <textarea
          v-model="output"
          rows="16"
          readonly
          class="w-full flex-grow p-3 bg-gray-100 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none transition-shadow font-mono text-sm whitespace-pre md:min-h-[400px] lg:min-h-[600px]"
          placeholder="Result will appear here..."
        ></textarea>
      </div>
    </div>
    <div
      v-if="error"
      class="mt-6 rounded-lg p-4 font-medium text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 transition-colors"
    >
      {{ error }}
    </div>
    <div
      v-if="success"
      class="mt-6 rounded-lg p-4 font-medium text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 transition-colors"
    >
      Successfully validated and formatted!
    </div>
  </div>
</template>
