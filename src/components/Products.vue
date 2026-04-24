<template>
    <section class="section-block bg-[var(--hero)]" id="Products">
        <div class="site-frame">
            <div class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">{{ attributes.Title }}</h2>
                </div>
                <div v-html="formattedHtml" class="section-lead"></div>
            </div>

            <div v-if="loaded" class="grid gap-5 lg:grid-cols-3">
                <article v-if="featuredProduct" class="reveal-up overflow-visible rounded-[2rem] border bg-card p-4 elevated lg:col-span-3 lg:p-6">
                    <div class="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
                        <div class="p-3 md:p-4">
                            <Badge class="h-auto rounded-full bg-accent text-accent-foreground">Featured</Badge>
                            <h3 class="mt-8 text-5xl font-black leading-none tracking-normal md:text-6xl">
                                {{ featuredProduct.attributes.title }}
                            </h3>
                            <div class="mt-5 flex flex-wrap gap-2">
                                <Badge v-for="tag in featuredProduct.attributes.tags" :key="tag" variant="secondary">
                                    {{ tag }}
                                </Badge>
                            </div>
                            <div v-html="featuredProduct.html" class="mt-8 content-copy"></div>
                            <Button as="a" :href="featuredProduct.attributes.url" target="_blank" rel="noopener noreferrer" class="mt-8 w-fit rounded-full">
                                打开产品
                                <ExternalLinkIcon data-icon="inline-end" />
                            </Button>
                        </div>
                        <div class="media-frame aspect-[16/10] rounded-[1.5rem] border lg:translate-x-6 lg:translate-y-6 lg:-rotate-1 lg:shadow-2xl">
                            <img :src="featuredProduct.attributes.cover" :alt="featuredProduct.attributes.title">
                        </div>
                    </div>
                </article>

                <article
                    v-for="file in restProducts"
                    :key="file.attributes.title"
                    class="reveal-up group overflow-hidden rounded-[1.5rem] border bg-card elevated"
                >
                    <div class="media-frame aspect-[16/10]">
                        <img :src="file.attributes.cover" class="transition duration-500 group-hover:scale-105" :alt="file.attributes.title">
                    </div>
                    <div class="p-5">
                        <div class="flex items-start justify-between gap-4">
                            <h3 class="text-xl font-black">{{ file.attributes.title }}</h3>
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
                        <div class="mt-4 flex flex-wrap gap-2">
                            <Badge v-for="tag in file.attributes.tags" :key="tag" variant="secondary">
                                {{ tag }}
                            </Badge>
                        </div>
                        <div v-html="file.html" class="mt-5 line-clamp-4 text-sm leading-7 text-muted-foreground"></div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { ExternalLinkIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { attributes, html } from '/contents/products/index.md';

const loaded = ref(false);

const formattedHtml = ref('');
const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, '<p class="content-dot">')
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};
formattedHtml.value = formatHtml(html);

const markdownContext = import.meta.glob('/contents/products/!(index).md');
const imageModules = import.meta.glob('/contents/products/images/*', { eager: true });
const markdownFiles = reactive([]);
const featuredProduct = computed(() => markdownFiles[0]);
const restProducts = computed(() => markdownFiles.slice(1));

const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map(async (loadMarkdown) => {
        const module = await loadMarkdown();
        const attributes = module.attributes;
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
    markdownFiles.sort((a, b) => b.attributes.date - a.attributes.date);
    loaded.value = true;
};

onMounted(async () => {
    await getFiles();
})
</script>
