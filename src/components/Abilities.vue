<template>
    <div class="jn-abilities mt-5 position-relative" id="Abilities">
        <span class="badge bg-success jn-badge">{{ attributes.Badge }}</span>

        <div class="row justify-content-evenly mt-5 mx-0">
            <div class="jn-left-panel mb-4 col-md-5 col-12">
                <h2 class="jn-h2">
                    {{ attributes.Title }}
                </h2>
                <div v-html="formattedHtml"></div>
            </div>

            <div v-if="loaded" class="jn-right-panel col-md-7 col-12">
                <div v-for="i in Math.ceil(markdownFiles.length / 2)" :key="i" class="row ">
                    <div v-for="j in 2" :key="j" class="col-md-6 col-12 mb-5">
                        <div class="card jn-card jn-abilities-card h-100 jn-animate-card">
                            <div class="card-body" v-if="markdownFiles[(i-1) * 2 + (j-1)]">
                                <div class="jn-icon">
                                    <i class="bi" :class="markdownFiles[(i-1) * 2 + (j-1)].attributes.icon"></i>
                                </div>
                                <h5 class="card-title">{{ markdownFiles[(i-1) * 2 + (j-1)].attributes.Title }}</h5>
                                <div v-html="markdownFiles[(i-1) * 2 + (j-1)].html" class="jn-card-text"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

// 导入主介绍内容
import { attributes, html } from '/contents/abilities/index.md';

const loaded = ref(false);

const formattedHtml = ref('');
const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, `<p><i class="bi bi-emoji-wink-fill text-success"></i> `)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};
formattedHtml.value = formatHtml(html);


// 导入 .md 文件
const markdownContext = import.meta.glob('/contents/abilities/!(index).md');
const markdownFiles = reactive([]);
const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map((path) =>
        path().then((module) => ({
            html: module.html,
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

onMounted(async () => {
    await getFiles();
})

</script>

<style scoped>
.jn-abilities {
    background-color: rgba(58, 232, 179, 0.08);
}

.jn-h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
}

.jn-fit {
    width: fit-content;
    padding: 0.5rem 1rem;
    border: 2px solid var(--bs-dark);
}

</style>