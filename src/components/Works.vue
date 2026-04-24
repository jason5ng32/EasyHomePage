<template>
    <section class="section-block bg-background" id="Works">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                <div>
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">{{ attributes.Title }}</h2>
                </div>
            </div>

            <div class="grid gap-4 md:grid-cols-3">
                <article
                    v-for="work in works"
                    :key="work.title"
                    class="reveal-up rounded-3xl border bg-card p-5 elevated transition hover:-translate-y-1"
                >
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-2xl font-black leading-tight">{{ work.title }}</h3>
                        <a
                            class="rounded-full border p-2 text-muted-foreground transition hover:bg-foreground hover:text-background"
                            :href="work.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="`${attributes.OpenLabel} ${work.title}`"
                        >
                            <ExternalLinkIcon class="size-4" />
                        </a>
                    </div>
                    <div class="mt-5 flex flex-wrap gap-2">
                        <Badge v-for="tag in work.tags" :key="tag" variant="secondary">
                            {{ tag }}
                        </Badge>
                    </div>
                    <div v-html="work.html" class="mt-6 text-sm leading-7 text-muted-foreground"></div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { ExternalLinkIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { renderContent } from '@/lib/markdown';
import { attributes } from '/contents/works.md';

const works = computed(() => {
    return [...(attributes.items || [])]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((item) => ({
            ...item,
            html: renderContent(item.content || ''),
        }));
});
</script>
