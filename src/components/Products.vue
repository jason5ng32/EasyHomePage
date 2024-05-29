<template>
    <div class="jn-products mt-5 position-relative" id="Products">
        <span class="badge bg-dark jn-badge ">{{ attributes.Badge }}</span>

        <div class="row justify-content-evenly mt-5 mx-0">
            <div class="jn-left-panel mb-4 col-md-5 col-12">
                <div class="sticky-wrapper">
                    <h2 class="jn-h2">
                        {{ attributes.Title }}
                    </h2>
                    <div v-html="formattedHtml"></div>
                </div>
            </div>

            <div v-if="loaded" class="jn-right-panel col-md-7 col-12">
                <div v-for="(file,index) in markdownFiles" :key="file" class="row justify-content-between ">
                    <div class="col-12 mb-5 jn-product-card">
                        <div class="card jn-card ">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ file.attributes.title }}
                                    <a class="text-decoration-none link-dark" :href="file.attributes.url"
                                        target="_blank" rel="noopener noreferrer">
                                        <i class="bi bi-arrow-up-right-circle"></i>
                                    </a>
                                </h5>
                                <div class="card-title mt-3">
                                    <span v-for="tags in file.attributes.tags" :key="index"
                                        class="badge bg-dark jn-tags me-2">
                                        {{ tags }}
                                    </span>
                                </div>
                                <div class="row my-3 align-items-start">
                                    <div v-html="file.html" class="jn-card-text col-md-8 col-12 jn-products-text"></div>
                                    <div class="col-md-4 col-12 pb-2">
                                        <div class="jn-cover-img">
                                            <img :src="file.attributes.cover" class="img-fluid"
                                                :alt="file.attributes.title">
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useMainStore } from '@/store';
import stickybits from 'stickybits';

// 导入主介绍内容
import { attributes, html } from '/contents/products/index.md';

const store = useMainStore();
const isMobile = computed(() => store.isMobile);

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
const markdownContext = import.meta.glob('/contents/products/!(index).md');
const imageModules = import.meta.glob('/contents/products/images/*', { eager: true });
const markdownFiles = reactive([]);

const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map(async (loadMarkdown) => {
        const module = await loadMarkdown();
        const attributes = module.attributes;

        // 使用图片文件名来获取正确的导入路径
        const imagePathKey = Object.keys(imageModules).find(key => key.includes(attributes.cover));
        const imageUrl = imagePathKey ? imageModules[imagePathKey].default : null;

        return {
            html: formatHtml(module.html),
            attributes: {
                ...attributes,
                cover: imageUrl
            }
        };
    });

    markdownFiles.push(...(await Promise.all(importPromises)));
    // 按照 data 降序排列
    markdownFiles.sort((a, b) => b.attributes.date - a.attributes.date);

    loaded.value = true;
};

onMounted(async () => {
    await getFiles();
    if (!isMobile.value) {
        stickybits('.sticky-wrapper', {
            stickyBitStickyOffset: 100,
        });
    }
})

</script>

<style scoped>

.jn-h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
}

.jn-tags {
    width: fit-content;
}

.jn-cover-img {
    border-radius: 4pt;
    position: relative;
    overflow: hidden;
}

.jn-product-card {
    position: relative;
}
</style>