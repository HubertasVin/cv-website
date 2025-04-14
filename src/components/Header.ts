interface Section {
  id: string
  label: string
}

export function createHeader(sections: Section[]): HTMLElement {
  const headerContainer = document.createElement('div')

  const header = document.createElement('header')
  header.className = 'bg-white shadow-md fixed w-full top-0 z-50'

  const nav = document.createElement('nav')
  nav.className = 'container mx-auto px-4 py-4'

  const navContent = document.createElement('div')
  navContent.className = 'flex items-center justify-between'

  const title = document.createElement('h1')
  title.className = 'text-2xl font-bold gradient-text'
  title.textContent = 'Hubertas Vindzigalskis'

  const links = document.createElement('div')
  links.className = 'flex gap-8'

  sections.forEach((section) => {
    const link = document.createElement('a')
    link.href = `#${section.id}`
    link.className = 'text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium'
    link.textContent = section.label
    links.appendChild(link)
  })

  navContent.appendChild(title)
  navContent.appendChild(links)
  nav.appendChild(navContent)
  header.appendChild(nav)

  const spacer = document.createElement('div')
  spacer.className = 'h-16'

  headerContainer.appendChild(header)
  headerContainer.appendChild(spacer)

  return headerContainer
}
