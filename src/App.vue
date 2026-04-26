<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Hackathons from './components/Hackathons.vue'
import Experience from './components/Experience.vue'
import StringComparison from './components/tools/StringComparison.vue'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const projectsRef = ref()

const handleFilterTechnology = (tech: string) => {
  projectsRef.value?.handleTechFilter(tech)
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

const currentHash = ref(window.location.hash)

onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentHash.value = window.location.hash
    if (currentHash.value !== '#string-comparison') {
      setTimeout(() => {
        const id = currentHash.value.replace('#', '')
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    }
  })
})
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200"
  >
    <Header :sections="sections" />

    <main class="container mx-auto px-4 py-8 flex-grow">
      <template v-if="currentHash === '#string-comparison'">
        <StringComparison />
      </template>
      <template v-else>
        <About @filter-technology="handleFilterTechnology" />
        <Experience />
        <Hackathons />
        <Projects ref="projectsRef" />
        <Contact />
      </template>
    </main>

    <footer
      class="bg-gray-800 dark:bg-gray-950 text-white py-6 mt-12 transition-colors duration-200"
    >
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ new Date().getFullYear() }} Hubertas Vindžigalskis. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
