<template>
    <section class="section-block bg-background" id="Works">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">把业余项目做成作品索引。</h2>
                </div>
                <div v-html="formattedHtml" class="section-lead"></div>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3" v-if="loaded">
                <article
                    v-for="file in markdownFiles"
                    :key="file.attributes.title"
                    class="reveal-up rounded-3xl border bg-card p-5 elevated transition hover:-translate-y-1"
                >
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-2xl font-black leading-tight">{{ file.attributes.title }}</h3>
                        <a
                            class="rounded-full border p-2 text-muted-foreground transition hover:bg-foreground hover:text-background"
                            :href="file.attributes.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="`Open ${file.attributes.title}`"
                        >
                            <ExternalLinkIcon class="size-4" />
                        </a>
                    </div>
                    <div class="mt-5 flex flex-wrap gap-2">
                        <Badge v-for="tag in file.attributes.tags" :key="tag" variant="secondary">
                            {{ tag }}
                        </Badge>
                    </div>
                    <div v-html="file.html" class="mt-6 text-sm leading-7 text-muted-foreground"></div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ExternalLinkIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { attributes, html } from '/contents/works/index.md';

const loaded = ref(false);
const formattedHtml = ref(html);
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
    markdownFiles.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : -1;
    });

    loaded.value = true;
};

onMounted(async () => {
    await getFiles();
})
</script>
