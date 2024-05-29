<template>
    <div class="jn-conversations mt-5 position-relative" id="Conversations">
        <span class="badge bg-purple jn-badge">{{ attributes.Badge }}</span>
        <div class="row justify-content-evenly mt-5 mx-0">
            <div class="px-5 col-12">
                <div v-if="loaded">
                    <div v-for="(file, index) in markdownFiles" :key="index"
                        :class="`row flex-nowrap align-items-start ${index % 2 === 0 ? '' : 'flex-row-reverse'}`">
                        <div :class="`conversation ${index % 2 === 0 ? 'conversation-right' : 'conversation-left'} col-8 col-md-9`"
                            v-html="file.html"></div>
                        <div class="col-4 col-md-3" :class="`jn-img-${index % 2 === 0 ? 'right' : 'left'}`">
                            <img :src="file.attributes.avatar" alt="avatar" class="img-fluid rounded-circle jn-avatar">
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
import { attributes } from '/contents/conversations/index.md';

const loaded = ref(false);

// 导入 .md 文件
const markdownContext = import.meta.glob('/contents/conversations/!(index).md');
const imageModules = import.meta.glob('/contents/conversations/images/*', { eager: true });
const markdownFiles = reactive([]);

const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map(async (loadMarkdown) => {
        const module = await loadMarkdown();
        const attributes = module.attributes;

        // 使用图片文件名来获取正确的导入路径
        const imagePathKey = Object.keys(imageModules).find(key => key.includes(attributes.avatar));
        const imageUrl = imagePathKey ? imageModules[imagePathKey].default : null;

        return {
            html: formatHtml(module.html),
            attributes: {
                ...attributes,
                avatar: imageUrl
            }
        };
    });

    markdownFiles.push(...(await Promise.all(importPromises)));
    // 按照 data 降序排列
    markdownFiles.sort((a, b) => b.attributes.date - a.attributes.date);

    loaded.value = true;
};

const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, `<span class="badge bg-white text-purple">`)
        .replace(/<\/li>/g, '</span>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

onMounted(async () => {
    await getFiles();
})

</script>

<style scoped>
.jn-conversations {
    background-color: rgba(195, 105, 244, 0.08);
}

.jn-avatar {
    max-height: 100pt;
    margin-top: -6pt;
}

.jn-img-left {
    display: flex;
    justify-content: left;
    align-items: center;
}

.jn-img-right {
    display: flex;
    justify-content: right;
    align-items: center;
}

.conversation {
    margin-bottom: 50px;
    padding: 20px;
    position: relative;
    box-shadow: 0 0 10pt #0000001c;
}

.conversation-right {
    background: var(--purple);
    border-radius: 10px;
    margin-right: 20px;
    color: #fff;
}

.conversation-left {
    background: white;
    border-radius: 10px;
    margin-left: 20px;
    color: var(--bs-dark);
}

.conversation-right:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid var(--purple);
    border-right: 10px solid transparent;
    border-top: 10px solid var(--purple);
    border-bottom: 10px solid transparent;
    right: -18px;
    top: 6px;
    filter: drop-shadow(4px 0px 2px #0000001c);
}

.conversation-left:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid white;
    border-top: 10px solid white;
    border-bottom: 10px solid transparent;
    left: -18px;
    top: 6px;
    filter: drop-shadow(-4px 0px 2px #0000001c);
}
</style>