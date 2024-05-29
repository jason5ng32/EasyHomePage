<template>
    <div class="jn-footer mt-5 position-relative" id="Footer">
        <div class="row p-5 w-100">
            <div class="col-md-6 col-lg-6 col-12">
                <h1>{{attributes.Title}}</h1>
                <p class="opacity-75">{{attributes.Subtitle}}</p>
            </div>
            <div class="col-md-6 col-lg-6 col-12">
                <h3>{{attributes.ContactTitle}}</h3>
                <p class="opacity-75">{{attributes.ContactSubtitle}}</p>
                <div class="flex">
                    <a v-for=" (item, index) in attributes.Social" :key="index"
                        :class="[isMobile ? 'jn-footer-social-mobile me-3' : 'jn-footer-social-desktop me-4']" :href="item.url"
                        :title="item.name" target="_blank">
                        <i class="bi" :class="'bi-' + item.icon"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="jn-footer-placeholder">
            {{ attributes.Title }}
            &copy;
            {{year}}
        </div>
    </div>

</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/store';
const store = useMainStore();
const isMobile = computed(() => store.isMobile);

// 导入主介绍内容
import { attributes } from '/contents/footer.md';

const year = new Date().getFullYear();

</script>

<style scoped>
.jn-footer {
    background-color: rgb(249, 249, 252);
}

.jn-footer-social-desktop {
    font-size: 1.7rem;
    color: var(--purple);
}

.jn-footer-social-mobile {
    font-size: 1rem;
    color: var(--purple);
}

.jn-footer-placeholder {
    background-color: var(--purple);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40pt;
    font-weight: bold;
}
</style>