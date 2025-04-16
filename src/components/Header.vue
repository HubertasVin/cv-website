<script setup lang="ts">
import { ref } from 'vue'

interface Section {
  id: string
  label: string
}

defineProps<{ sections: Section[] }>()

const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <div>
    <header class="bg-white shadow-md fixed w-full top-0 z-50">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="flex-1 min-w-0 text-2xl font-bold gradient-text break-words">
          Hubertas Vindžigalskis
        </h1>

        <div class="hidden md:flex gap-8">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            {{ section.label }}
          </a>
        </div>

        <button
          @click="toggleMenu"
          class="md:hidden flex-none focus:outline-none cursor-pointer"
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
        <div v-show="showMenu" class="md:hidden bg-white shadow-md menu-collapse">
          <nav class="flex flex-col px-4 py-2 space-y-2">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="py-2 block text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              @click="showMenu = false"
            >
              {{ section.label }}
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
