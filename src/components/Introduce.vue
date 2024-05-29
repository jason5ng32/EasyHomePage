<template>
    <div class="row jn-introduce justify-content-evenly pt-5 mx-0" id="Introduce"
        :class="isMobile ? 'jn-mobile-mt' : 'jn-desktop-mt'">
        <div :class="[isMobile ? 'col-12 px-5 py-2':'col-5 p-5']">
            <div>
                <h2 class="jn-introduce-title"
                :class="[isMobile ? 'jn-h2-mobile' : 'jn-h2']"
                >{{ attributes.name }}</h2>
                <h3 class="jn-introduce-subtitle"
                :class="[isMobile ? 'jn-h3-mobile' : 'jn-h3']"
                >{{ attributes.subtitle }}</h3>
                <div class="text-dark mb-4 jn-introduce-doc">
                    <div v-html="formattedHtml" class="mb-4"></div>
                
                <a class="btn-purple" href="#Conversations">{{ attributes.button }} &nbsp;<i
                        class="bi bi-arrow-down-circle"></i></a>
                    </div>
            </div>
        </div>
        <div v-if="!isMobile" class="col-6 px-4 pt-4">
            <div class="jn-introduce-bg">
            </div>
        </div>
    </div>

</template>

<script setup>
import { computed, ref } from 'vue';
import { useMainStore } from '@/store';
import { html } from '/contents/introduce.md';
import { attributes } from '/contents/introduce.md';

const store = useMainStore();
const isMobile = computed(() => store.isMobile);

// 格式化 html
const formattedHtml = ref('');
const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, `<p><i class="bi bi-check-circle-fill text-purple"></i> `)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};
formattedHtml.value = formatHtml(html);



</script>

<style scoped>
.jn-introduce {
    background-color: rgb(249, 249, 252);
    min-height: 560pt;
    /* border: 3px solid #060606; */
}

.jn-mobile-mt {
    margin-top: 32pt;
}

.jn-desktop-mt {
    margin-top: 32pt;
    min-height: 680pt;
}

.jn-h2 {
    font-size: 5rem;
    font-weight: 700;
    color: #000;
}

.jn-h3 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--purple);
}

.jn-h2-mobile {
    font-size: 3.5rem;
    font-weight: 700;
    color: #000;
}

.jn-h3-mobile {
    font-size: 2.1rem;
    font-weight: 700;
    color: var(--purple);
}

.jn-introduce-img {
    height: 100%;
}

.jn-introduce-bg {
    background-image: url('/contents/memoji.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
}
</style>