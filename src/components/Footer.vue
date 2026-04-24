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
import {
    GithubIcon,
    GlobeIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    RssIcon,
    TwitterIcon,
} from 'lucide-vue-next';
import { siteConfig } from '@/content/site';
import { footerSection as section } from '@/content/sections';

const socialIconMap = {
    github: GithubIcon,
    twitter: TwitterIcon,
    linkedin: LinkedinIcon,
    envelope: MailIcon,
    instagram: InstagramIcon,
    rss: RssIcon,
    wikipedia: GlobeIcon,
};

const getSocialIcon = (icon) => socialIconMap[icon] || GlobeIcon;
const socialLinks = siteConfig.socialLinks || [];
</script>
