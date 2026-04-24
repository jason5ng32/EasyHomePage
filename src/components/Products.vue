<template>
    <section class="section-block bg-hero" id="Products">
        <div class="site-frame">
            <div class="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">{{ attributes.Title }}</h2>
                </div>
            </div>

            <div class="grid gap-5 md:grid-cols-3">
                <article v-if="featuredProduct" class="reveal-up overflow-visible rounded-[2rem] border bg-card p-4 elevated md:col-span-3 md:p-6">
                    <div class="grid gap-6 md:grid-cols-[0.88fr_1.12fr] md:items-center">
                        <div class="p-3 md:p-4">
                            <Badge class="h-auto rounded-full bg-accent text-accent-foreground">{{ attributes.FeaturedLabel }}</Badge>
                            <h3 class="mt-8 text-5xl font-black leading-none tracking-normal md:text-6xl">
                                {{ featuredProduct.title }}
                            </h3>
                            <div class="mt-5 flex flex-wrap gap-2">
                                <Badge v-for="tag in featuredProduct.tags" :key="tag" variant="secondary" class="p-3">
                                    {{ tag }}
                                </Badge>
                            </div>
                            <div v-html="featuredProduct.html" class="mt-8 content-copy"></div>
                            <Button as="a" :href="featuredProduct.url" target="_blank" rel="noopener noreferrer" class="mt-8 w-fit rounded-full px-8 has-data-[icon=inline-end]:pr-8">
                                {{ attributes.OpenLabel }}
                                <ExternalLinkIcon data-icon="inline-end" />
                            </Button>
                        </div>
                        <div class="media-frame aspect-16/10 rounded-3xl md:translate-x-6 md:translate-y-6 md:-rotate-2 md:shadow-2xl">
                            <img :src="featuredProduct.cover" :alt="featuredProduct.title">
                        </div>
                    </div>
                </article>

                <article
                    v-for="product in restProducts"
                    :key="product.title"
                    class="reveal-up group overflow-hidden rounded-[1.5rem] border bg-card elevated"
                >
                    <div class="media-frame aspect-[16/10]">
                        <img :src="product.cover" class="transition duration-500 group-hover:scale-105" :alt="product.title">
                    </div>
                    <div class="p-5">
                        <div class="flex items-start justify-between gap-4">
                            <h3 class="text-xl font-black">{{ product.title }}</h3>
                            <a
                                class="rounded-full border p-2 text-muted-foreground transition hover:bg-foreground hover:text-background"
                                :href="product.url"
                                target="_blank"
                                rel="noopener noreferrer"
                                :aria-label="`${attributes.OpenLabel} ${product.title}`"
                            >
                                <ExternalLinkIcon class="size-4" />
                            </a>
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2">
                            <Badge v-for="tag in product.tags" :key="tag" variant="secondary" class="p-3">
                                {{ tag }}
                            </Badge>
                        </div>
                        <div v-html="product.html" class="mt-5 line-clamp-4 text-sm leading-7 text-muted-foreground"></div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { ExternalLinkIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { renderContent } from '@/lib/markdown';
import { attributes } from '/contents/products.md';

const imageModules = import.meta.glob('/contents/products/images/*', { eager: true });

const resolveCover = (cover) => {
    const imagePathKey = Object.keys(imageModules).find((key) => key.endsWith(`/${cover}`));
    return imagePathKey ? imageModules[imagePathKey].default : cover;
};

const products = computed(() => {
    return [...(attributes.items || [])]
        .sort((a, b) => Number(b.date || 0) - Number(a.date || 0))
        .map((item) => ({
            ...item,
            cover: resolveCover(item.cover),
            html: renderContent(item.content || '', 'content-dot'),
        }));
});

const featuredProduct = computed(() => products.value[0]);
const restProducts = computed(() => products.value.slice(1));
</script>
