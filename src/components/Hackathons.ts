interface Hackathon {
  name: string
  description: string
  link?: string
}

const icons = {
  externalLink: '/assets/external-link.svg'
}

const hackathons: Hackathon[] = [
  {
    name: '2024 IBM Z Xplore Code-a-thon',
    description:
      'Ranked in the top 3 in the Vilnius division. I tackled various tasks on the z/OS platform. This code-a-thon included challenges involving data from IoT devices, allowing me to explore the interoperability of current technologies.',
  },
  {
    name: '2023 NASA International Space Apps Challenge',
    description:
      'Collaborated in a team to design and develop a web application that renders a detailed map of moonquakes on the lunar surface. Our project highlighted data visualisation techniques, earning us 3rd place.',
    link: 'https://github.com/HubertasVin/moonquake-map',
  },
]

export function createHackathons(): HTMLElement {
  const section = document.createElement('section')
  section.id = 'hackathons'
  section.className = 'py-20'

  section.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">Hackathons</h2>
        <div class="bg-white shadow-lg rounded-xl p-8">
          <div class="space-y-6">
            ${hackathons
              .map(
                (hackathon) => `
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-3">${hackathon.name}</h3>
                <p class="text-gray-600 mb-4">${hackathon.description}</p>
                ${
                  hackathon.link
                    ? `
                  <a
                    href="${hackathon.link}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="external-link inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <span>View Project</span>
                    <img src="${icons.externalLink}" alt="External link" class="w-4 h-4" />
                  </a>
                `
                    : ''
                }
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `

  return section
}
