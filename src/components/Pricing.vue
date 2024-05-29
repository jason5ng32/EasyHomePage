<template>
    <div class="jn-pricing mt-5 position-relative" id="Pricing">
        <span class="badge bg-purple jn-badge ">{{ attributes.Badge }}</span>

        <div class="row mt-5 mx-0 jn-pricing-row px-4" v-if="loaded">
            <div v-for="(file,index) in markdownFiles" :key="file" class="col-mb-4 col-xl-4 col-xxl-4 col-12 mb-5">
                <div class="card jn-card mb-4 position-relative jn-animate-card">
                    <div class="jn-plan-title" :class="{'bg-primary': index % 3 === 0,
                    'bg-success': index % 3 === 1,
                    'bg-purple': index % 3 === 2}">
                        <h5 class="card-title">{{ file.attributes.Title}}</h5>
                        <h6 class="card-subtitle mb-2 mb-4 opacity-50">{{ file.attributes.Subtitle}}</h6>
                    </div>
                    <div class="card-body">
                        <div class="jn-plan-detail">
                            <ul class="list-group list-group-flush">
                                <li v-for="includes in file.attributes.Includes" class="list-group-item border-0">
                                    <i class="bi bi-check-circle-fill text-success"></i>
                                    {{ includes }}
                                </li>

                                <li v-for="excludes in file.attributes.Excludes" class="list-group-item border-0">
                                    <i class="bi bi-x-circle-fill text-danger"></i>
                                    {{ excludes }}
                                </li>
                            </ul>
                        </div>
                        <div class="jn-plan-buy row m-3">
                            <button class="btn" @click="showToast" :class="{'btn-primary': index % 3 === 0,
                            'btn-success': index % 3 === 1,
                            'btn-purple': index % 3 === 2}">{{ file.attributes.Price}}</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="toast-container  p-3 jn-toast">
        <div id="toastInfoMask" class="toast" role="alert" ref="toastEl" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto" :class="alert.alertStyle">{{ alert.alertTitle }}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ alert.alertMessage }}
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Toast } from 'bootstrap';

// 导入主介绍内容
import { attributes } from '/contents/pricing/index.md';

const loaded = ref(false);
const alert = ref({});
const toastEl = ref(null);

// 显示 Toast
const showToast = (duration = 2000) => {
    alert.value = {
        alertTitle: attributes.alertTitle,
        alertMessage: attributes.alertMessage,
        alertStyle: "text-success"
    };
    if (toastEl.value) {
        const toastInfoMask = new Toast(toastEl.value, {
            delay: 2000,
        });
        toastInfoMask.show();
    } else {
        console.error("Toast element not found");
    }
}

// 导入 .md 文件
const markdownContext = import.meta.glob('/contents/pricing/!(index).md');
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

const formatHtml = (content, icon) => {
    return content.toString()
        .replace(/<li>/g, `<p><i class="bi text-purple ${icon}"></i> `)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

const adjustButtonPosition = () => {
    const screenWidth = window.innerWidth;
    const contentWidth = 1600; // 主内容区域的宽度
    const spaceOnRight = (screenWidth - contentWidth) / 2;

    const button = document.querySelector('.jn-toast');
    if (screenWidth > 1600) { // 只在屏幕宽度大于1600px时调整
        button.style.right = `${spaceOnRight + 0}px`; // 保持20px的距离
    } else {
        button.style.right = '0'; // 在小屏幕上使用默认位置
    }
}

onMounted(() => {
    window.addEventListener('resize', adjustButtonPosition);
    adjustButtonPosition();
});

onMounted(async () => {
    await getFiles();
})

</script>

<style scoped>
.jn-toast {
    position: fixed;
    z-index: 9999;
    top: 0;
    right: 0;
    margin-bottom: 2pt;
    margin-right: 2pt;
    max-width: 80vw;
}

.jn-pricing {
    background-color: rgba(195, 105, 244, 0.08);
}

.jn-h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
}

.jn-tags {
    width: fit-content;
}

.jn-plan-title {
    padding: 1rem;
    color: white;
    position: relative;
    border-radius: 10pt;
    margin: -1pt -5pt 0 -5pt;
    box-shadow: 0 0 10pt #0000005c;
}
</style>