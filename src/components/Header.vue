<script setup lang="ts">
interface Section {
  id: string
  label: string
}

defineProps<{
  sections: Section[]
}>()
</script>

<template>
  <div>
    <header class="bg-white shadow-md fixed w-full top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold gradient-text">Hubertas Vindzigalskis</h1>
          <div class="flex gap-8">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              {{ section.label }}
            </a>
          </div>
        </div>
      </nav>
    </header>
    <div class="h-16"></div>
  </div>
</template>
