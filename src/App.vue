<template>
  <div class="min-h-screen bg-background">
    <Nav />
    <main id="main-part" class="overflow-x-clip">
      <Introduce />
      <Stories />
      <Skills />
      <Jobs />
      <Products />
      <Works />
      <Services />
      <Footer />
    </main>
    <Toaster position="bottom-right" rich-colors close-button />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import ScrollReveal from 'scrollreveal';

import Nav from './components/Nav.vue'
import Introduce from './components/Introduce.vue'
import Stories from './components/Stories.vue'
import Skills from './components/Skills.vue'
import Jobs from './components/Jobs.vue'
import Products from './components/Products.vue'
import Works from './components/Works.vue'
import Services from './components/Services.vue'
import Footer from './components/Footer.vue'

const scrollEffect = (el, delay = 120, origin = 'bottom', reset = false) => {
  ScrollReveal().reveal(el, {
    delay,
    duration: 850,
    origin,
    distance: '48px',
    reset,
    viewFactor: 0.08,
  });
};

const hideLoading = () => {
  const loadingElement = document.getElementById("jn-loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
};
hideLoading();

onMounted(() => {
  scrollEffect('.reveal-up', 120, 'bottom', false);
  scrollEffect('.reveal-left', 160, 'left', false);
  scrollEffect('.reveal-right', 160, 'right', false);
});
</script>
