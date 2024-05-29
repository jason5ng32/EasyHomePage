<template>
    <div class="jn-works mt-5 position-relative" id="Works">
        <span class="badge bg-success jn-badge">{{ attributes.Badge }}</span>
        <div class="row mt-5 mx-0 jn-works-row" v-if="loaded">
            <div v-for="n in Math.ceil(markdownFiles.length / 3)" :key="n" class="row">
                <div v-for="(file, index) in markdownFiles.slice((n - 1) * 3, n * 3)" :key="file.id"
                    class="col-md-4 col-12 mb-5">
                    <div class="card jn-works-card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ file.attributes.title }}
                                <a class="text-decoration-none link-success" :href="file.attributes.url" target="_blank"
                                    rel="noopener noreferrer">
                                    <i class="bi bi-arrow-up-right-circle"></i>
                                </a>
                            </h5>
                            <div class="card-title mt-3">
                                <span v-for="tags in file.attributes.tags" :key="tags"
                                    class="badge bg-success jn-tags me-2">
                                    {{ tags }}
                                </span>
                            </div>
                            <div v-html="file.html" class="jn-card-text"></div>
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
import { attributes, html } from '/contents/works/index.md';

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
const markdownContext = import.meta.glob('/contents/works/!(index).md');
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
.jn-works {
    background-color: rgba(58, 232, 179, 0.08);
}

.jn-works-card {
    box-shadow: 0 0 10pt #0000001c;
    border: 1px solid #ffffff2e;
}

.jn-works-row {
    padding-left: 18pt;
}
</style>