<template>
    <section class="section-block bg-panel text-panel-foreground" id="Skills">
        <div class="site-frame">
            <div class="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
                <div class="md:sticky md:top-28">
                    <SectionHeader
                        :badge="section.badge"
                        :title="section.title"
                        :description-html="section.descriptionHtml"
                        variant="panel"
                    />
                </div>

                <EmptyState v-if="!skills.length" variant="panel" />

                <div v-else class="skill-board">
                    <article
                        v-for="(skill, index) in skills"
                        :key="skill.title"
                        class="skill-card reveal-up"
                    >
                        <div class="flex items-start justify-between gap-5">
                            <div class="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                                <component :is="skill.iconComponent" class="size-6" />
                            </div>
                            <span class="text-xs font-black uppercase tracking-[0.18em] text-panel-subtle">
                                {{ String(index + 1).padStart(2, '0') }}
                            </span>
                        </div>

                        <h3 class="mt-7 text-2xl font-black leading-tight">{{ skill.title }}</h3>
                        <div class="mt-4 text-sm leading-7 text-panel-muted" v-html="skill.html"></div>

                        <div v-if="skill.tags?.length" class="mt-6 flex flex-wrap gap-2">
                            <span v-for="tag in skill.tags" :key="tag" class="rounded-full border border-panel-border bg-panel-tag px-2.5 py-1 text-xs font-bold text-panel-tag-foreground">
                                {{ tag }}
                            </span>
                        </div>

                        <div class="mt-7">
                            <div class="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-panel-subtle">
                                <span>{{ section.levelLabel }}</span>
                                <span>{{ skill.level }}%</span>
                            </div>
                            <div class="h-1.5 overflow-hidden rounded-full bg-panel-track">
                                <div class="h-full rounded-full bg-accent" :style="{ width: `${skill.level}%` }"></div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import {
    BarChart3Icon,
    LayoutGridIcon,
    StoreIcon,
    UsersIcon,
    SparklesIcon,
} from 'lucide-vue-next';
import EmptyState from '@/components/EmptyState.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { skillsSection as section } from '@/content/sections';

const iconMap = {
    chart: BarChart3Icon,
    layout: LayoutGridIcon,
    store: StoreIcon,
    users: UsersIcon,
};

const skills = computed(() => {
    return (section.items || []).map((item) => ({
        ...item,
        iconComponent: iconMap[item.icon] || SparklesIcon,
    }));
});
</script>

<style scoped>
.skill-board {
    display: grid;
    gap: 1rem;
}

.skill-card {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--panel-border);
    border-radius: 2rem;
    background: var(--panel-card);
    padding: 1.5rem;
    box-shadow: var(--panel-card-shadow);
    transition: transform 220ms ease, background-color 220ms ease, border-color 220ms ease;
}

.skill-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 0% 0%, var(--panel-glow), transparent 32%),
        linear-gradient(135deg, var(--panel-sheen), transparent 36%);
    pointer-events: none;
}

.skill-card > * {
    position: relative;
}

.skill-card:hover {
    transform: translateY(-0.25rem);
    border-color: var(--panel-border-strong);
    background: var(--panel-card-hover);
}

@media (min-width: 768px) {
    .skill-board {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
</style>
