<template>
    <section class="relative isolate scroll-mt-20 overflow-hidden bg-hero pt-30 pb-10 md:scroll-mt-24 md:pt-40" id="Introduce">
        <div class="site-frame relative grid items-center gap-10 pb-14 md:pb-16 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.8fr)] md:items-end">
            <div>
                <h1 class="max-w-5xl text-[4rem] font-black leading-[0.88] tracking-normal text-foreground md:text-[6rem]">
                    {{ attributes.name }}
                </h1>
                <h2 class="mt-4 max-w-4xl text-4xl font-black leading-none tracking-normal text-primary md:text-6xl">
                    {{ attributes.subtitle }}
                </h2>

                <div class="mt-8 max-w-3xl">
                    <div class="content-copy text-intro-copy" v-html="formattedHtml"></div>
                </div>

            </div>

            <div class="relative hidden min-h-[560px] md:-mb-28 md:block md:self-end">
                <div class="absolute inset-x-6 bottom-0 h-[480px] rounded-t-full bg-foreground"></div>
                <div class="jn-introduce-bg absolute inset-0 bg-contain bg-bottom bg-no-repeat"></div>
                <div class="absolute bottom-8 left-0 rounded-2xl border bg-intro-floating p-4 shadow-xl backdrop-blur">
                    <div class="text-4xl font-black">{{ attributes.heroStatValue }}</div>
                    <div class="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">{{ attributes.heroStatLabel }}</div>
                </div>
                <div class="absolute right-0 top-28 max-w-[180px] rotate-3 rounded-2xl bg-accent p-4 text-sm font-black leading-5 text-accent-foreground shadow-xl">
                    {{ attributes.heroCallout }}
                </div>
            </div>

            <Button
                as="a"
                href="#Stories"
                size="icon-lg"
                variant="outline"
                class="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-intro-action shadow-sm backdrop-blur"
                aria-label="Scroll to the next section"
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
