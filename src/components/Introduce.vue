<template>
    <section class="relative isolate min-h-[100svh] scroll-mt-28 overflow-hidden bg-[var(--hero)] pt-24 md:scroll-mt-32 md:pt-28" id="Introduce">
        <div class="absolute inset-x-0 top-0 h-px bg-border"></div>
        <div class="absolute right-[-18vw] top-24 hidden size-[48vw] rounded-full border border-foreground/10 md:block"></div>
        <div class="site-frame relative grid min-h-[calc(100svh-6rem)] items-center gap-10 pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] lg:items-end">
            <div class="pb-6 lg:pb-10">
                <h1 class="max-w-5xl text-[4rem] font-black leading-[0.88] tracking-normal text-foreground sm:text-[7rem] lg:text-[9rem]">
                    {{ attributes.name }}
                </h1>
                <h2 class="mt-4 max-w-4xl text-4xl font-black leading-none tracking-normal text-primary sm:text-6xl lg:text-7xl">
                    {{ attributes.subtitle }}
                </h2>

                <div class="mt-8 max-w-3xl">
                    <div class="content-copy text-foreground/75" v-html="formattedHtml"></div>
                </div>

            </div>

            <div class="relative hidden min-h-[620px] lg:block">
                <div class="absolute inset-x-6 bottom-0 h-[520px] rounded-t-full bg-foreground"></div>
                <div class="jn-introduce-bg absolute inset-0 bg-contain bg-bottom bg-no-repeat"></div>
                <div class="absolute bottom-8 left-0 rounded-2xl border bg-background/90 p-4 shadow-xl backdrop-blur">
                    <div class="text-4xl font-black">30+</div>
                    <div class="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">years online</div>
                </div>
                <div class="absolute right-0 top-28 max-w-[180px] rotate-3 rounded-2xl bg-accent p-4 text-sm font-black leading-5 text-accent-foreground shadow-xl">
                    长期在线，持续创造。
                </div>
            </div>

            <Button
                as="a"
                href="#Conversations"
                size="icon-lg"
                variant="outline"
                class="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-background/80 shadow-sm backdrop-blur"
                aria-label="滚动到下一部分"
            >
                <ChevronDownIcon />
            </Button>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDownIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { html } from '/contents/introduce.md';
import { attributes } from '/contents/introduce.md';

const formattedHtml = ref('');
const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, '<p class="content-check">')
        .replace(/<\/li>/g, '</p>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};
formattedHtml.value = formatHtml(html);
</script>

<style scoped>
.jn-introduce-bg {
    background-image: url('/contents/memoji.png');
}
</style>
