<template>
    <header class="navbar navbar-expand-lg py-2 mb-3 jn-navbar-top">
        <nav id="navbar-top" class="container-xl">
            <div class="jn-logo">
                <a class="navbar-brand flex align-items-center align-content-center" href="#">
                    <span>
                        <img :src="logo" alt="logo" class="jn-logo-img">
                    </span>
                    <span class=" fw-bold  "> {{ attributes.Name }}</span>
                    <span class="fw-lighter" :title="attributes.AgeTitle">.v{{ age }}</span>
                </a>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon bg-transparent "></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <!-- 导航循环 -->
                <div class="navbar-nav">
                    <a v-for="item in ['Introduce','Conversations', 'Abilities', 'Jobs', 'Products', 'Works', 'Pricing', 'Footer']"
                        :key="item" class="nav-link" :href="`#${item}`">{{
                        attributes[item] }}</a>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { attributes } from '/contents/nav.md';
import logo from '/contents/logo.png';

const age = ref(0);

const calAge = () => {
    const now = new Date();
    const birth = new Date('1987-11-06');
    const diff = now.getTime() - birth.getTime();
    const ageInMilliseconds = new Date(diff);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    const ageInDecimal = ageInYears + (ageInMilliseconds.getMonth() / 12);
    age.value = ageInDecimal.toFixed(2);
};

onMounted(() => {
    calAge();
});

</script>

<style scoped>
.dark-mode-nav {
    background-color: #171a1d !important;
    border-color: #a8a8a863 !important;
}

.jn-navbar-top {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.7);
}

.jn-logo-img {
    width: 28pt;
    height: 28pt;
    border-radius: 50%;
    margin-right: 10px;
}
</style>