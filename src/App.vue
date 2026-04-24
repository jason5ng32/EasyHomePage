<template>
  <div class="min-h-screen bg-background">
    <a class="skip-link" href="#main-part">跳到主要内容</a>
    <Nav />
    <main id="main-part" class="overflow-x-clip" tabindex="-1">
      <component
        v-for="section in sections"
        :key="section.id"
        :is="section.component"
      />
    </main>
    <Toaster position="bottom-right" rich-colors close-button />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Toaster } from '@/components/ui/sonner';
import { navigationItems } from '@/content/site';
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

const sectionRegistry = {
  Introduce,
  Stories,
  Skills,
  Jobs,
  Products,
  Works,
  Services,
  Footer,
};

const defaultSectionOrder = Object.keys(sectionRegistry);
const configuredSectionIds = navigationItems.length
  ? navigationItems.map((item) => item.id)
  : defaultSectionOrder;

const sections = computed(() => configuredSectionIds
  .map((id) => ({
    id,
    component: sectionRegistry[id],
  }))
  .filter((section) => section.component));

const scrollEffect = (el, delay = 120, origin = 'bottom', reset = false) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

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

<style scoped>
.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 60;
  transform: translateY(-150%);
  border-radius: 999px;
  background: var(--foreground);
  color: var(--background);
  padding: 0.65rem 1rem;
  font-size: 0.875rem;
  font-weight: 800;
  transition: transform 160ms ease;
}

.skip-link:focus {
  transform: translateY(0);
  outline: 3px solid var(--ring);
  outline-offset: 3px;
}
</style>
