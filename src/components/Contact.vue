<script setup lang="ts">
const icons = {
  github: '/assets/brand-github.svg',
  linkedin: '/assets/brand-linkedin.svg',
  mail: '/assets/mail.svg',
  phone: '/assets/phone.svg',
}
</script>

<template>
  <section id="contact" class="py-20">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-bold text-gray-900 mb-8 text-center">Contact</h2>
      <div class="bg-white shadow-lg rounded-xl p-8">
        <p class="text-gray-700 text-lg mb-8 text-center">
          Please feel free to reach out through any of the following channels
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <a
            href="mailto:hubertas.vindzigalskis@proton.me"
            class="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex-wrap"
          >
            <img
              :src="icons.mail"
              alt="Email"
              class="w-5 h-5 flex-shrink-0"
              style="
                filter: invert(25%) sepia(89%) saturate(2339%) hue-rotate(217deg) brightness(96%)
                  contrast(105%);
              "
            />
            <span class="break-all flex-1"> hubertas.vindzigalskis@proton.me </span>
          </a>
          <a
            href="tel:+37067927176"
            class="w-full flex items-center gap-3 p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors flex-wrap"
          >
            <img
              :src="icons.phone"
              alt="Phone"
              class="w-5 h-5 flex-shrink-0"
              style="
                filter: invert(30%) sepia(30%) saturate(4510%) hue-rotate(131deg) brightness(89%)
                  contrast(103%);
              "
            />
            <span class="break-all flex-1"> +370 679 27176 </span>
          </a>
          <a
            href="https://www.linkedin.com/in/hubertas-vindzigalskis/"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center gap-3 p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <img
              :src="icons.linkedin"
              alt="LinkedIn"
              class="w-5 h-5 flex-shrink-0"
              style="
                filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(137deg) brightness(103%)
                  contrast(101%);
              "
            />
            <span class="flex-1">Connect on LinkedIn</span>
          </a>
          <a
            href="https://github.com/HubertasVin"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition-colors"
          >
            <img
              :src="icons.github"
              alt="GitHub"
              class="w-5 h-5 flex-shrink-0"
              style="
                filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(137deg) brightness(103%)
                  contrast(101%);
              "
            />
            <span class="flex-1">Follow on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
