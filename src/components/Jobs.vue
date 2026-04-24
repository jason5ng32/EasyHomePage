<template>
    <section class="section-block bg-background" id="Jobs">
        <div class="site-frame">
            <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                <div class="lg:sticky lg:top-28 lg:self-start">
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">{{ attributes.Title }}</h2>
                    <div v-html="formattedHtml" class="mt-8 content-copy"></div>
                </div>

                <div v-if="loaded" class="relative flex flex-col gap-5">
                    <div class="absolute left-4 top-6 hidden h-[calc(100%-3rem)] w-px bg-border md:block"></div>
                    <div
                        v-for="file in markdownFiles"
                        :key="file.attributes.id"
                        class="reveal-up grid gap-4 md:grid-cols-[2rem_minmax(0,1fr)]"
                    >
                        <div class="relative hidden md:block">
                            <div class="absolute left-1/2 top-10 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-accent shadow-sm"></div>
                        </div>
                        <article class="rounded-3xl border bg-card p-6 elevated">
                            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div class="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{{ file.attributes.range }}</div>
                                    <h3 class="mt-2 text-2xl font-black leading-tight">
                                        {{ file.attributes.title }}
                                        <span class="text-muted-foreground">@</span>
                                        <a
                                            class="text-primary underline-offset-4 hover:underline"
                                            :href="file.attributes.url"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {{ file.attributes.company }}
                                        </a>
                                    </h3>
                                </div>
                                <Badge class="h-auto rounded-full">{{ file.attributes.company }}</Badge>
                            </div>
                            <div class="mt-6 content-copy" v-html="file.html"></div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Badge } from '@/components/ui/badge';
import { attributes, html } from '/contents/jobs/index.md';

const loaded = ref(false);
const formattedHtml = ref('');

const markdownContext = import.meta.glob('/contents/jobs/!(index).md');
const markdownFiles = reactive([]);

const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map((path) =>
        path().then((module) => ({
            html: formatHtml(module.html, 'content-arrow'),
            attributes: module.attributes,
        }))
    );
    markdownFiles.push(...(await Promise.all(importPromises)));
    markdownFiles.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : -1;
    });

    loaded.value = true;
};

const formatHtml = (content, markerClass) => {
    return content.toString()
        .replace(/<li>/g, `<p class="${markerClass}">`)
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

formattedHtml.value = formatHtml(html, 'content-dot');

onMounted(async () => {
    await getFiles();
})
</script>
