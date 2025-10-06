<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  title: string
  description: string
  link: string
  tech: string[]
}

const icons = {
  externalLink: '/assets/external-link.svg',
  filter: '/assets/filter.svg',
}

const projects: Project[] = [
  {
    title: 'Note Taking Website',
    description:
      'A web application for taking and organizing notes with rich text editing capabilities.',
    link: 'https://github.com/HubertasVin/PSI-1',
    tech: ['.NET', 'C#', 'JavaScript'],
  },
  {
    title: 'POS System',
    description:
      'Point of Sale system implementation with comprehensive features for retail management.',
    link: 'https://github.com/HubertasVin/pos-1206',
    tech: ['Spring Boot', 'Java', 'Docker', 'AWS SNS'],
  },
  {
    title: 'CV Website',
    description: 'Personal CV website to showcase my projects.',
    link: 'https://github.com/HubertasVin/cv-website',
    tech: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Road System',
    description:
      'Java-based application for managing and analyzing road systems and traffic patterns.',
    link: 'https://github.com/HubertasVin/road-system',
    tech: ['Java'],
  },
  {
    title: 'Parallel Programming with C++',
    description: 'Practice of creating parallel programs in C++ using OpenMP and MPI.',
    link: 'https://github.com/HubertasVin/parallel-programming-with-cpp',
    tech: ['C++', 'OpenMP', 'MPI'],
  },
  {
    title: 'Find string CLI program',
    description: 'A CLI app written in Go that can find all occurances of a string in a given directory.',
    link: 'https://github.com/HubertasVin/findstr',
    tech: ['Go', 'Goroutines'],
  },
  {
    title: 'Chanseq - Golang library for ordered parallel output',
    description: 'A small Go library for easy ordered output in parallel applications.',
    link: 'https://github.com/HubertasVin/chanseq',
    tech: ['Go', 'Goroutines'],
  },
  {
    title: 'Installation Script',
    description:
      'Automated installation script for system setup, streamlining the process of configuring new systems.',
    link: 'https://github.com/HubertasVin/installation-script',
    tech: ['Linux', 'Shell', 'Automation'],
  },
  {
    title: 'Ansible Server Setup',
    description:
      'Server configuration automation using Ansible, enabling consistent and repeatable server deployments.',
    link: 'https://github.com/HubertasVin/ansible-server-setup',
    tech: ['Linux', 'Ansible', 'Automation'],
  },
  {
    title: 'Moonquake Map',
    description:
      'Interactive visualization of moonquakes using NASA data. Built with TypeScript and modern web technologies.',
    link: 'https://github.com/HubertasVin/moonquake-map',
    tech: ['TypeScript', 'React', 'NASA API'],
  },
  {
    title: 'SQL DML with Haskell',
    description: 'Implementation of SQL Data Manipulation Language using Haskell.',
    link: 'https://github.com/HubertasVin/SQL-DML-with-Haskell',
    tech: ['Haskell'],
  },
]

const techColors: { [key: string]: string } = {
  TypeScript: '#3178C6',
  JavaScript: '#BFAD19',
  Java: '#B07219',
  'C++': '#00599C',
  'C#': '#68217A',
  Go: '#00ADD8',
  '.NET': '#512BD4',
  React: '#61DAFB',
  Shell: '#4A4A4A',
  Linux: '#CFA31F',
  'Spring Boot': '#6DB33F',
  'Vue.js': '#42B883',
}

const selectedTech = ref<string | null>(null)
const showFilters = ref(false)

const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tech))).sort()

const filteredProjects = computed(() =>
  selectedTech.value
    ? projects.filter((project) => project.tech.includes(selectedTech.value!))
    : projects
)

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const handleTechFilter = (tech: string) => {
  selectedTech.value = selectedTech.value === tech ? null : tech
}

defineExpose({
  handleTechFilter,
})
</script>

<template>
  <section id="projects" class="py-20">
    <div class="max-w-6xl mx-auto">
      <div class="relative flex justify-center items-center mb-8">
        <h2 class="text-4xl font-bold text-gray-900">Projects</h2>
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2
          bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          @click="toggleFilters"
        >
          <img :src="icons.filter" alt="Filter" class="w-4 h-4" />
          Filter
        </button>
      </div>
      <div v-show="showFilters" class="mb-8 p-4 bg-white rounded-xl shadow-sm">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tech in allTechnologies"
            :key="tech"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer"
            :style="{
              backgroundColor:
                selectedTech === tech
                  ? techColors[tech] || '#4A5568'
                  : techColors[tech]
                  ? `${techColors[tech]}15`
                  : '#EDF2F7',
              color: selectedTech === tech ? 'white' : 'rgb(55, 65, 81)',
            }"
            @click="handleTechFilter(tech)"
          >
            {{ tech }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in filteredProjects"
          :key="project.title"
          class="bg-white shadow-lg rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
        >
          <h3 class="text-xl font-bold text-gray-900 mb-3">{{ project.title }}</h3>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-3 py-1 rounded-full text-sm font-medium"
              :style="{
                backgroundColor: techColors[tech] ? `${techColors[tech]}15` : '#EDF2F7',
                color: techColors[tech] || '#4A5568',
              }"
            >
              {{ tech }}
            </span>
          </div>
          <a
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="external-link inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <span>View project</span>
            <img :src="icons.externalLink" alt="External link" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
