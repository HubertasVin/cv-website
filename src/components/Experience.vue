<script setup lang="ts">
interface Experience {
  name: string
  description: string
	date: string
  link?: string
}

const icons = {
  externalLink: '/assets/external-link.svg',
}

const experience: Experience[] = [
  {
    name: 'CERN IT intern',
    description:
      'At CERN, I worked on the CMS experiment, assisting with updates and fixes to their monitoring deployment. My primary responsibility was deploying Prometheus and Grafana to a cluster within their secured testing network. Initially intended as a proof-of-concept, the deployment proved so successful that it is now used in the CMS control room at CERN.',
    date: '2025 July - 2025 September',
  },
]
</script>

<template>
  <section id="experience" class="py-20">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">Work experience</h2>
      <div class="bg-white shadow-lg rounded-xl p-8">
        <div class="space-y-6">
          <div
            v-for="e in experience"
            :key="e.name"
            class="bg-gray-50 p-6 rounded-lg"
          >
            <h3 class="text-xl font-semibold">{{ e.name }}</h3>
						<p class="text-gray-400 mb-2">{{ e.date }}</p>
            <p class="text-gray-600 mb-4">{{ e.description }}</p>
            <a
              v-if="e.link"
              :href="e.link"
              target="_blank"
              rel="noopener noreferrer"
              class="external-link inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <span>View additional information</span>
              <img :src="icons.externalLink" alt="External link" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
