<template>
    <section class="section-block bg-background" id="Jobs">
        <div class="site-frame">
            <div class="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start">
                <div class="md:sticky md:top-28 md:self-start">
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading">{{ attributes.Title }}</h2>
                    <div v-html="formattedDescription" class="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
                    </div>
                </div>

                <div class="relative flex flex-col gap-5">
                    <div class="absolute left-4 top-6 hidden h-[calc(100%-3rem)] w-px bg-border md:block"></div>
                    <div v-for="job in jobs" :key="job.id"
                        class="reveal-up grid gap-4 md:grid-cols-[2rem_minmax(0,1fr)]">
                        <div class="relative hidden md:block">
                            <div
                                class="absolute left-1/2 top-10 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-accent shadow-sm">
                            </div>
                        </div>
                        <article class="rounded-3xl border bg-card p-6 elevated">
                            <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <div class="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{{
                                        job.range }}</div>
                                    <h3 class="mt-2 text-2xl font-black leading-tight">
                                        {{ job.title }}
                                        <span class="text-muted-foreground">@</span>
                                        <a class="text-primary underline-offset-4 hover:underline" :href="job.url"
                                            target="_blank" rel="noopener noreferrer">
                                            {{ job.company }}
                                        </a>
                                    </h3>
                                </div>
                                <Badge class="h-auto rounded-full md:block hidden">{{ job.company }}</Badge>
                            </div>
                            <div class="mt-6 content-copy" v-html="job.html"></div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';
import { renderContent } from '@/lib/markdown';
import { attributes } from '/contents/jobs.md';

const formattedDescription = computed(() => {
    return renderContent(attributes.Description || '', 'content-dot ml-4 mt-2 text-muted-foreground');
});

const jobs = computed(() => {
    return [...(attributes.items || [])]
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .map((item) => ({
            ...item,
            html: renderContent(item.content || '', 'content-arrow'),
        }));
});
</script>
