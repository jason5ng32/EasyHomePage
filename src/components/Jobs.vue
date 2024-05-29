<template>
    <div class="jn-jobs mt-5 position-relative" id="Jobs">
        <span class="badge bg-purple jn-badge">{{ attributes.Badge }}</span>
        <div class="row justify-content-evenly mt-5 mx-0">
            <div class="jn-left-panel mb-4 col-md-5 col-12">
                <h2 class="jn-h2">
                    {{ attributes.Title }}
                </h2>
                <div v-html="formattedHtml"></div>
            </div>
            <div v-if="loaded" class="jn-right-panel  col-md-7 col-12">
                <ul class="nav nav-underline mb-3 text-nowrap overflow-x-scroll flex-nowrap " id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation" v-for="(file, index) in markdownFiles"
                        :key="'nav-item-' + file.attributes.id">
                        <button class="nav-link" :class="{ active: activeTab === index }" @click="activeTab = index"
                            :id="'pills-' + file.attributes.id + '-tab'" type="button" role="tab"
                            :aria-selected="activeTab === index">{{ file.attributes.company }}</button>
                    </li>
                </ul>
                <div class="tab-content jn-tab-content card jn-card mb-5" id="pills-tabContent"
                :class="[isMobile? 'p-4 jn-jobs-content-mobile':'p-5']"
                >
                    <div class="tab-pane fade" :class="{ 'show active': activeTab === index }"
                        v-for="(file, index) in markdownFiles" :key="'tab-pane-' + file.attributes.id"
                        :id="'jobs-' + file.attributes.id" role="tabpanel"
                        :aria-labelledby="'pills-' + file.attributes.id + '-tab'" tabindex="0">
                        <div class="fs-4">
                            <span class="fw-bold">{{ file.attributes.title }}</span> @
                            <a class="text-decoration-none link-purple" :href="file.attributes.url" target="_blank"
                                rel="noopener noreferrer">
                                {{ file.attributes.company }}
                            </a>
                        </div>
                        <div class="badge bg-purple">{{ file.attributes.range }}</div>
                        <div class="mt-3 fw-light" v-html="file.html"></div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useMainStore } from '@/store';

// 导入主介绍内容
import { attributes,html } from '/contents/jobs/index.md';

const store = useMainStore();
const isMobile = computed(() => store.isMobile);

const loaded = ref(false);
const activeTab = ref(0);

const formattedHtml = ref('');

// 导入 .md 文件
const markdownContext = import.meta.glob('/contents/jobs/!(index).md');
const markdownFiles = reactive([]);
const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map((path) =>
        path().then((module) => ({
            html: formatHtml(module.html, 'bi-arrow-right-circle-fill'),
            attributes: module.attributes,
        }))
    );
    markdownFiles.push(...(await Promise.all(importPromises)));
    // 按照 data 降序排列
    markdownFiles.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : -1;
    });

    loaded.value = true;
};

const formatHtml = (content, icon) => {
    return content.toString()
        .replace(/<li>/g, `<p><i class="bi text-purple ${icon}"></i> `)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

formattedHtml.value = formatHtml(html,'bi-emoji-expressionless-fill');

onMounted(async () => {
    await getFiles();
})

</script>

<style scoped>

.jn-h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
}
.jn-jobs {
    background-color: rgba(195, 105, 244, 0.08);
    min-height: 500pt;
}

.jn-tab-content {
    height: fit-content;
    transition: all 0.5s;
    position: relative;
}

.jn-tab-content::after {
    content: '';
    position: absolute;
    bottom : 6pt;
    right: 6pt;
    width: 20pt;
    height: 20pt;
    background-color: rgba(195, 105, 244, 0.48);
    border-radius: 50%;
}

.jn-tab-content::before {
    content: '';
    position: absolute;
    bottom : 10pt;
    right: 10pt;
    width: 20pt;
    height: 20pt;
    background-color: rgba(17, 214, 128, 0.48);
    border-radius: 50%;
}
.jn-jobs-content-mobile {
    margin: 0 -14pt;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background-color: var(--purple);
    color: white;
}

.nav-link {
    color: var(--purple);
}

.nav-underline .nav-link.active {
    font-weight: 400;
}
</style>