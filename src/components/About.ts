const technologies = [
  { name: 'TypeScript', color: '#3178C6', icon: '/assets/typescript.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: '/assets/javascript.svg' },
  { name: 'Java', color: '#B07219', icon: '/assets/java.svg' },
  { name: 'C#', color: '#68217A', icon: '/assets/c_sharp.svg' },
  { name: '.NET', color: '#512BD4', icon: '/assets/dotnet.svg' },
  { name: 'Shell', color: '#4A4A4A', icon: '/assets/bash.svg' },
  { name: 'Linux', color: '#FCC624', icon: '/assets/linux.svg' },
  { name: 'Spring Boot', color: '#6DB33F', icon: '/assets/spring.svg' },
]

const icons = {
  github: '/assets/brand-github.svg',
  linkedin: '/assets/brand-linkedin.svg',
  mapPin: '/assets/map-pin.svg',
}

const languages = [
  { language: 'Lithuanian', level: 'Native' },
  { language: 'English', level: 'C1' },
  { language: 'French', level: 'A2' },
]

const education = {
  school: 'Vilnius University',
  degree: 'Bachelor in Computer Science',
  period: 'September 2022 - June 2026',
}

export function createAbout(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'about'
  section.className = 'py-20'

  section.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
      <div class="bg-white shadow-lg rounded-xl p-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <div class="flex-1">
            <p class="text-gray-700 text-lg mb-6 leading-relaxed">
              I am a passionate Software Developer with experience in full-stack development, focusing on creating efficient and scalable solutions. My expertise spans across multiple programming languages and frameworks, allowing me to tackle diverse technical challenges.
            </p>
            
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">Technologies</h3>
              <div class="flex flex-wrap gap-4">
                ${technologies
                  .map(
                    (tech) => `
                  <button
                    class="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                    style="background-color: ${tech.color}15; color: ${tech.color}"
                    data-tech="${tech.name}"
                  >
                    <img src="${tech.icon}" alt="${tech.name}" class="w-4 h-4" />
                    ${tech.name}
                  </button>
                `
                  )
                  .join('')}
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">Languages</h3>
              <div class="flex flex-wrap gap-4">
                ${languages
                  .map(
                    ({ language, level }) => `
                  <div class="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                    ${language} - ${level}
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">Education</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold">${education.school}</h4>
                <p class="text-gray-600">${education.degree}</p>
                <p class="text-gray-500 text-sm">${education.period}</p>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2 text-gray-600">
                <img src="${icons.mapPin}" alt="Map pin" class="w-5 h-5" />
                <span>Vilnius, Lithuania</span>
              </div>
              <a
                href="https://www.linkedin.com/in/hubertas-vindzigalskis/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <img src="${icons.linkedin}" alt="LinkedIn" class="w-5 h-5" />
              </a>
              <a
                href="https://github.com/HubertasVin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <img src="${icons.github}" alt="Github" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  // Add event listeners for tech buttons
  const techButtons = section.querySelectorAll('button[data-tech]')
  techButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tech = button.getAttribute('data-tech')
      const projectsSection = document.getElementById('projects')
      if (projectsSection && tech) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
        const event = new CustomEvent('filterTechnology', { detail: tech })
        document.dispatchEvent(event)
      }
    })
  })

  return section
}
