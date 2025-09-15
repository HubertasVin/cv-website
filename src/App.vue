<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Hackathons from './components/Hackathons.vue'
import Experience from './components/Experience.vue'

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
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <Header :sections="sections" />

    <main class="container mx-auto px-4 py-8">
      <About @filter-technology="handleFilterTechnology" />
      <Experience />
      <Hackathons />
      <Projects ref="projectsRef" />
      <Contact />
    </main>

    <footer class="bg-gray-800 text-white py-6 mt-12">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ new Date().getFullYear() }} Hubertas Vindžigalskis. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
