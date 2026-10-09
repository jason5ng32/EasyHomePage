<template>
    <footer class="bg-background py-10" id="Footer">
        <div class="site-frame">
            <div class="grid gap-6 rounded-[2rem] border bg-card p-6 elevated md:grid-cols-[0.85fr_1.15fr] md:p-10">
                <div>
                    <div class="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{{ section.badge }}</div>
                    <h2 class="mt-4 text-5xl font-black tracking-normal">{{ section.title }}</h2>
                    <p class="mt-4 max-w-xl text-muted-foreground">{{ section.subtitle }}</p>
                </div>
                <div>
                    <h3 class="text-2xl font-black">{{ section.contactTitle }}</h3>
                    <p class="mt-4 max-w-3xl leading-8 text-muted-foreground">{{ section.contactSubtitle }}</p>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <a
                            v-for="item in socialLinks"
                            :key="item.name"
                            class="inline-flex size-11 items-center justify-center rounded-full border bg-background text-foreground transition hover:bg-foreground hover:text-background"
                            :href="item.url"
                            :title="item.name"
                            :aria-label="item.name"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <component :is="getSocialIcon(item.icon)" class="size-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed, h } from 'vue';
import {
    GlobeIcon,
    MailIcon,
    RssIcon,
} from '@lucide/vue';
import { useMainStore } from '@/store';

const store = useMainStore();
const section = computed(() => store.sections.footer);

const createBrandIcon = (paths) => ({
    name: 'BrandIcon',
    render: () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: 'lucide lucide-icon',
    }, paths),
});

const GithubIcon = createBrandIcon([
    h('path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }),
    h('path', { d: 'M9 18c-4.51 2-5-2-7-2' }),
]);

const TwitterIcon = createBrandIcon([
    h('path', { d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' }),
]);

const LinkedinIcon = createBrandIcon([
    h('path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }),
    h('rect', { width: '4', height: '12', x: '2', y: '9' }),
    h('circle', { cx: '4', cy: '4', r: '2' }),
]);

const InstagramIcon = createBrandIcon([
    h('rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5' }),
    h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }),
    h('line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5' }),
]);

const socialIconMap = {
    github: GithubIcon,
    twitter: TwitterIcon,
    x: TwitterIcon,
    linkedin: LinkedinIcon,
    envelope: MailIcon,
    mail: MailIcon,
    instagram: InstagramIcon,
    rss: RssIcon,
    wikipedia: GlobeIcon,
};

const getSocialIcon = (icon) => socialIconMap[icon] || GlobeIcon;
const socialLinks = computed(() => store.siteConfig.socialLinks || []);
</script>
