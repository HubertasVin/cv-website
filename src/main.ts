import './style.css';
import { createHeader } from './components/Header';
import { createAbout } from './components/About';
import { createProjects } from './components/Projects';
import { createContact } from './components/Contact';
import { createHackathons } from './components/Hackathons';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

function createApp() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  const mainContent = document.createElement('div');
  mainContent.className = 'min-h-screen bg-gradient-to-b from-gray-50 to-gray-100';
  
  mainContent.appendChild(createHeader(sections));
  
  const main = document.createElement('main');
  main.className = 'container mx-auto px-4 py-8';
  
  main.appendChild(createAbout());
  main.appendChild(createHackathons());
  main.appendChild(createProjects());
  main.appendChild(createContact());
  
  mainContent.appendChild(main);
  
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-800 text-white py-6 mt-12';
  footer.innerHTML = `
    <div class="container mx-auto px-4 text-center">
      <p>&copy; ${new Date().getFullYear()} Hubertas Vindzigalskis. All rights reserved.</p>
    </div>
  `;
  
  mainContent.appendChild(footer);
  app.appendChild(mainContent);
}

createApp();
