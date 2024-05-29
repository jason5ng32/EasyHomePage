<template>
  <Nav />
  <div id="main-part" class="container mt-2 px-0">
    <div data-bs-spy="scroll" data-bs-target="#navbar-top" data-bs-root-margin="0px 0px -40%"
      data-bs-smooth-scroll="true" class="rounded-2" tabindex="0">
      <Introduce />
      <div :class="[isMobile ? 'jn-items-full-width':'jn-items']">
        <Conversations />
        <Abilities />
        <Jobs />
        <Products />
        <Works />
        <Pricing />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Nav from './components/Nav.vue'
import Introduce from './components/Introduce.vue'
import Conversations from './components/Conversations.vue'
import Abilities from './components/Abilities.vue'
import Jobs from './components/Jobs.vue'
import Products from './components/Products.vue'
import Works from './components/Works.vue'
import Pricing from './components/Pricing.vue'

import Footer from './components/Footer.vue'

import { computed, onMounted } from 'vue';
import { useMainStore } from '@/store';

import ScrollReveal from 'scrollreveal';

const store = useMainStore();
const isMobile = computed(() => store.isMobile);

// 滚动特效
const scrollEffect = (el, delay = 200, origin, reset = false) => {
  ScrollReveal().reveal(el, {
    delay: delay,
    duration: 1000,
    origin: origin,
    distance: '100px',
    reset: reset,
  });
};

// 加载完成后隐藏 loading
const hideLoading = () => {
  let loadingElement = document.getElementById("jn-loading");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
};
hideLoading();


onMounted(() => {
  scrollEffect('.jn-introduce-bg', 200, 'bottom', false);
  scrollEffect('.jn-introduce-title', 600, 'top', false);
  scrollEffect('.jn-introduce-subtitle', 600, 'left', false);
  scrollEffect('.jn-introduce-doc', 1600, 'bottom', false);
  setTimeout(() => {
    scrollEffect('.conversation-right', 200, 'right', false);
    scrollEffect('.conversation-left', 200, 'left', false);
    scrollEffect('.jn-animate-card', 200, 'bottom', false);
  }, 1000);
});


</script>


<style scoped>
.jn-items {
  margin: 0 auto;
  width: 90%;
}
.jn-items-full-width {
  margin: 0 auto;
  width: 100%;
}
</style>
