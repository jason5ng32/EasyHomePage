<template>
    <section class="section-block bg-[var(--panel)] text-[var(--panel-foreground)]" id="Abilities">
        <div class="site-frame">
            <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div class="reveal-left">
                    <Badge class="section-label h-auto border-white/15 bg-white/10 text-white/70">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading text-[var(--panel-foreground)]">{{ attributes.Title }}</h2>
                    <div v-html="formattedHtml" class="mt-8 max-w-xl text-sm leading-8 text-white/65"></div>
                </div>

                <div v-if="loaded" class="grid gap-4 md:grid-cols-2">
                    <article
                        v-for="(file, index) in markdownFiles"
                        :key="file.attributes.Title"
                        class="reveal-up group rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]"
                    >
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                                <component :is="getAbilityIcon(file.attributes.icon)" class="size-7" />
                            </div>
                            <div class="text-5xl font-black leading-none text-white/10">
                                {{ String(index + 1).padStart(2, '0') }}
                            </div>
                        </div>
                        <h3 class="mt-10 text-2xl font-black">{{ file.attributes.Title }}</h3>
                        <div v-html="file.html" class="mt-4 text-sm leading-7 text-white/62"></div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import {
    BarChart3Icon,
    LayoutGridIcon,
    StoreIcon,
    UsersIcon,
    SparklesIcon,
} from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { attributes, html } from '/contents/abilities/index.md';

const loaded = ref(false);

const iconMap = {
    'bi-columns-gap': LayoutGridIcon,
    'bi-shop': StoreIcon,
    'bi-people': UsersIcon,
    'bi-bar-chart': BarChart3Icon,
};

const getAbilityIcon = (iconName) => iconMap[iconName] || SparklesIcon;

const formattedHtml = ref('');
const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, '<p class="content-dot">')
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};
formattedHtml.value = formatHtml(html);

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
    markdownFiles.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : -1;
    });

    loaded.value = true;
};

onMounted(async () => {
    await getFiles();
})
</script>
