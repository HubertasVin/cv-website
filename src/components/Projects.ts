import { ExternalLink, Filter } from 'lucide'

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
    title: 'Moonquake Map',
    description:
      'Interactive visualization of moonquakes using NASA data. Built with TypeScript and modern web technologies.',
    link: 'https://github.com/HubertasVin/moonquake-map',
    tech: ['TypeScript', 'React', 'NASA API'],
  },
  {
    title: 'Installation Script',
    description:
      'Automated installation script for system setup, streamlining the process of configuring new systems.',
    link: 'https://github.com/HubertasVin/installation-script',
    tech: ['Shell', 'Linux', 'Automation'],
  },
  {
    title: 'Ansible Server Setup',
    description:
      'Server configuration automation using Ansible, enabling consistent and repeatable server deployments.',
    link: 'https://github.com/HubertasVin/ansible-server-setup',
    tech: ['Ansible', 'Automation', 'Linux'],
  },
  {
    title: 'POS System',
    description:
      'Point of Sale system implementation with comprehensive features for retail management.',
    link: 'https://github.com/HubertasVin/pos-1206',
    tech: ['Java', 'Spring Boot', 'Docker', 'AWS SNS'],
  },
  {
    title: 'Note Taking Website',
    description:
      'A web application for taking and organizing notes with rich text editing capabilities.',
    link: 'https://github.com/HubertasVin/PSI-1',
    tech: ['C#', '.NET', 'JavaScript'],
  },
  {
    title: 'SQL DML with Haskell',
    description: 'Implementation of SQL Data Manipulation Language using Haskell.',
    link: 'https://github.com/HubertasVin/SQL-DML-with-Haskell',
    tech: ['Haskell'],
  },
  {
    title: 'Road System',
    description:
      'Java-based application for managing and analyzing road systems and traffic patterns.',
    link: 'https://github.com/HubertasVin/road-system',
    tech: ['Java'],
  },
]

const techColors: { [key: string]: string } = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Java: '#B07219',
  'C#': '#68217A',
  '.NET': '#512BD4',
  Shell: '#4A4A4A',
  Linux: '#FCC624',
  'Spring Boot': '#6DB33F',
}

export function createProjects(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'projects'
  section.className = 'py-20'

  let selectedTech: string | null = null
  let showFilters = false

  const container = document.createElement('div')
  container.className = 'max-w-6xl mx-auto'

  const headerDiv = document.createElement('div')
  headerDiv.className = 'flex justify-between items-center mb-8'

  const title = document.createElement('h2')
  title.className = 'text-4xl font-bold text-gray-900'
  title.textContent = 'Projects'

  const filterButton = document.createElement('button')
  filterButton.className =
    'flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
  filterButton.innerHTML = `<img src="${icons.filter}" alt="External link" class="w-4 h-4" /> Filter`
  filterButton.onclick = () => {
    showFilters = !showFilters
    updateFilters()
  }

  headerDiv.appendChild(title)
  headerDiv.appendChild(filterButton)

  const filtersContainer = document.createElement('div')
  filtersContainer.className = 'mb-8 p-4 bg-white rounded-xl shadow-sm hidden'

  const projectsGrid = document.createElement('div')
  projectsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'

  function updateFilters() {
    filtersContainer.style.display = showFilters ? 'block' : 'none'
    const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.tech))).sort()
    filtersContainer.innerHTML = ''
    const techButtons = document.createElement('div')
    techButtons.className = 'flex flex-wrap gap-2'

    allTechnologies.forEach((tech) => {
      const button = document.createElement('button')
      button.className = `px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        selectedTech === tech ? 'text-white' : 'text-gray-700'
      }`
      button.style.backgroundColor =
        selectedTech === tech
          ? techColors[tech] || '#4A5568'
          : techColors[tech]
          ? `${techColors[tech]}15`
          : '#EDF2F7'
      button.textContent = tech
      button.onclick = () => {
        selectedTech = selectedTech === tech ? null : tech
        updateProjects()
        updateFilters()
      }
      techButtons.appendChild(button)
    })

    filtersContainer.appendChild(techButtons)
  }

  function updateProjects() {
    const filteredProjects =
      selectedTech !== null
        ? projects.filter((project) => project.tech.includes(selectedTech!))
        : projects

    projectsGrid.innerHTML = ''
    filteredProjects.forEach((project) => {
      const projectCard = document.createElement('div')
      projectCard.className =
        'bg-white shadow-lg rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl'

      projectCard.innerHTML = `
        <h3 class="text-xl font-bold text-gray-900 mb-3">${project.title}</h3>
        <p class="text-gray-600 mb-4 h-24">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tech
            .map(
              (tech) => `
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              style="background-color: ${
                techColors[tech] ? `${techColors[tech]}15` : '#EDF2F7'
              }; color: ${techColors[tech] || '#4A5568'}"
            >
              ${tech}
            </span>
          `
            )
            .join('')}
        </div>
        <a
          href="${project.link}"
          target="_blank"
          rel="noopener noreferrer"
          class="external-link inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <span>View Project</span>
          <img src="${icons.externalLink}" alt="External link" class="w-4 h-4" />
        </a>
      `
      projectsGrid.appendChild(projectCard)
    })
  }

  // Attach a global event listener for the custom event "filterTechnology".
  // When dispatched from the About section, this will update the selected technology and re-render the projects.
  document.addEventListener('filterTechnology', (event: Event) => {
    // TypeScript type assertion if needed:
    const customEvent = event as CustomEvent
    const tech = customEvent.detail as string
    selectedTech = tech
    // Optionally, open the filters view if it was hidden:
    showFilters = true
    updateFilters()
    updateProjects()
  })

  container.appendChild(headerDiv)
  container.appendChild(filtersContainer)
  container.appendChild(projectsGrid)
  section.appendChild(container)

  updateProjects() // Render initial projects

  return section
}
