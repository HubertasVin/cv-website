<script setup lang="ts">
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import IconSun from './icons/IconSun.vue'
import IconMoon from './icons/IconMoon.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

interface Section {
  id: string
  label: string
}

defineProps<{ sections: Section[] }>()

const showMenu = ref(false)
const showToolsMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeToolsMenu = () => {
  setTimeout(() => {
    showToolsMenu.value = false
  }, 200)
}
</script>

<template>
  <div>
    <header
      class="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 z-50 transition-colors duration-200"
    >
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="flex-1 min-w-0 text-2xl font-bold gradient-text break-words">
          <a href="#">Hubertas Vindžigalskis</a>
        </h1>

        <div class="hidden md:flex gap-8 items-center">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            {{ section.label }}
          </a>

          <button
            @click="toggleDark()"
            class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <IconMoon v-if="isDark" class="w-5 h-5" />
            <IconSun v-else class="w-5 h-5" />
          </button>

          <div class="relative">
            <button
              @click="showToolsMenu = !showToolsMenu"
              @blur="closeToolsMenu"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium flex items-center gap-1 cursor-pointer"
            >
              Tools
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div
                v-show="showToolsMenu"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <a
                  href="#string-comparison"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  String Comparison
                </a>
              </div>
            </transition>
          </div>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden flex-none focus:outline-none cursor-pointer text-gray-600 dark:text-gray-300"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <transition name="menu">
        <div
          v-show="showMenu"
          class="md:hidden bg-white dark:bg-gray-900 shadow-md menu-collapse transition-colors duration-200"
        >
          <nav class="flex flex-col px-4 py-2 space-y-2">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="py-2 block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              @click="showMenu = false"
            >
              {{ section.label }}
            </a>
            <div
              class="py-2 block font-medium text-gray-800 dark:text-gray-100 border-t dark:border-gray-700 mt-2 pt-2 transition-colors duration-200"
            >
              Tools
            </div>
            <a
              href="#string-comparison"
              class="py-2 pl-4 block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              @click="showMenu = false"
            >
              String Comparison
            </a>
          </nav>
        </div>
      </transition>
    </header>
    <div class="h-16"></div>
  </div>
</template>

<style scoped>
.menu-collapse {
  overflow: hidden;
}
.menu-enter-from,
.menu-leave-to {
  max-height: 0;
}
.menu-enter-to,
.menu-leave-from {
  max-height: 240px;
}
.menu-enter-active,
.menu-leave-active {
  transition: max-height 0.3s ease;
}
</style>
