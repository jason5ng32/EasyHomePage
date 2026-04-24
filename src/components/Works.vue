<template>
    <section class="section-block bg-background" id="Works">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                <SectionHeader :badge="section.badge" :title="section.title" />
            </div>

            <EmptyState v-if="!works.length" />

            <div v-else class="grid gap-4 md:grid-cols-3">
                <article
                    v-for="work in works"
                    :key="work.title"
                    class="reveal-up rounded-3xl border bg-card p-5 elevated transition hover:-translate-y-1"
                >
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-2xl font-black leading-tight">{{ work.title }}</h3>
                        <a
                            class="rounded-full border p-2 text-muted-foreground transition hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                            :href="work.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="`${section.openLabel} ${work.title}`"
                        >
                            <ExternalLinkIcon class="size-4" aria-hidden="true" />
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
import { ExternalLinkIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import EmptyState from '@/components/EmptyState.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { worksSection as section } from '@/content/sections';

const works = section.items || [];
</script>
