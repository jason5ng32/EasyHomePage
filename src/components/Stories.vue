<template>
    <section class="section-block bg-background" id="Stories">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                <SectionHeader :badge="section.badge" :title="section.title" />
            </div>

            <EmptyState v-if="!stories.length" />

            <div v-else class="story-stack">
                <article
                    v-for="item in stories"
                    :key="`mobile-${item.key}`"
                    class="story-card w-full overflow-hidden rounded-4xl border bg-card p-6 text-card-foreground"
                >
                    <div class="pointer-events-none absolute right-5 top-0 font-serif text-[8rem] leading-none text-story-quote">“</div>
                    <div class="story-content relative pt-5 text-[1.02rem] leading-8 text-foreground" v-html="item.html"></div>

                    <div v-if="item.tags?.length" class="mt-auto flex flex-wrap gap-2 pt-8">
                        <span v-for="tag in item.tags" :key="tag" class="rounded-full bg-story-tag px-2.5 py-1 text-xs font-bold text-muted-foreground ring-1 ring-border">
                            {{ tag }}
                        </span>
                    </div>
                </article>
            </div>

            <div v-if="stories.length" class="story-columns">
                <div v-for="(column, columnIndex) in storyColumns" :key="columnIndex" class="story-column">
                    <article
                        v-for="item in column"
                        :key="`desktop-${item.key}`"
                        class="story-card w-full overflow-hidden rounded-[2rem] border bg-card p-6 text-card-foreground"
                    >
                        <div class="pointer-events-none absolute right-5 top-0 font-serif text-[8rem] leading-none text-story-quote">“</div>
                        <div class="story-content relative pt-5 text-[1.02rem] leading-8 text-foreground" v-html="item.html"></div>

                        <div v-if="item.tags?.length" class="mt-auto flex flex-wrap gap-2 pt-8">
                            <span v-for="tag in item.tags" :key="tag" class="rounded-full bg-story-tag px-2.5 py-1 text-xs font-bold text-muted-foreground ring-1 ring-border">
                                {{ tag }}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import EmptyState from '@/components/EmptyState.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { storiesSection as section } from '@/content/sections';

const stories = computed(() => {
    return (section.items || []).map((item, index) => ({
        ...item,
        key: `story-${index}`,
    }));
});

const storyColumns = computed(() => {
    const columns = [[], [], [], []];
    stories.value.forEach((item, index) => {
        columns[index % columns.length].push(item);
    });
    return columns;
});
</script>

<style scoped>
.story-content :deep(p) {
    margin-bottom: 1rem;
}

.story-card {
    position: relative;
    break-inside: avoid;
    box-shadow: var(--story-card-shadow);
}

.story-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        linear-gradient(145deg, var(--story-card-wash), transparent 44%),
        radial-gradient(circle at 0% 0%, var(--story-card-glow), transparent 30%);
    pointer-events: none;
}

.story-stack {
    display: grid;
    gap: 1.25rem;
}

.story-columns {
    display: none;
}

@media (min-width: 768px) {
    .story-stack {
        display: none;
    }

    .story-columns {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        align-items: start;
        gap: 1.25rem;
    }

    .story-column {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }
}

.story-content :deep(p:last-child) {
    margin-bottom: 0;
}

.story-content :deep(ul) {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin-top: 1rem;
}

.story-content :deep(li) {
    position: relative;
    padding-left: 1.25rem;
}

.story-content :deep(li::before) {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: var(--accent);
}
</style>
