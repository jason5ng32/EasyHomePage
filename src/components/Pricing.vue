<template>
    <section class="section-block bg-[var(--panel)] text-[var(--panel-foreground)]" id="Pricing">
        <div class="site-frame">
            <div class="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <Badge class="section-label h-auto border-white/15 bg-white/10 text-white/70">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading text-[var(--panel-foreground)]">有些邀请，可以从这里开始。</h2>
                </div>
                <p class="section-lead text-white/62">
                    不一定正经，但每一项都可以成为一次见面、一次聊天，或者一次合作的理由。
                </p>
            </div>

            <div class="grid gap-4 lg:grid-cols-3" v-if="loaded">
                <article
                    v-for="(file,index) in markdownFiles"
                    :key="file.attributes.Title"
                    :class="[
                        'reveal-up flex min-h-[520px] flex-col rounded-[2rem] border border-white/10 p-6',
                        index === 1 ? 'bg-accent text-accent-foreground' : 'bg-white/[0.06] text-white'
                    ]"
                >
                    <div>
                        <div class="text-xs font-black uppercase tracking-[0.18em] opacity-60">Plan {{ index + 1 }}</div>
                        <h3 class="mt-5 text-4xl font-black leading-none">{{ file.attributes.Title }}</h3>
                        <p class="mt-4 text-sm leading-7 opacity-70">{{ file.attributes.Subtitle }}</p>
                    </div>
                    <ul class="mt-8 flex flex-col gap-3">
                        <li v-for="item in file.attributes.Includes" :key="item" class="flex gap-3 text-sm">
                            <CheckCircleIcon class="mt-0.5 size-4 shrink-0" />
                            <span>{{ item }}</span>
                        </li>
                        <li v-for="item in file.attributes.Excludes" :key="item" class="flex gap-3 text-sm opacity-55">
                            <XCircleIcon class="mt-0.5 size-4 shrink-0" />
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                    <Button
                        class="mt-8 w-full rounded-full"
                        :variant="index === 1 ? 'outline' : 'secondary'"
                        @click="showToast"
                    >
                        {{ file.attributes.Price }}
                    </Button>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { toast } from 'vue-sonner';
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { attributes } from '/contents/pricing/index.md';

const loaded = ref(false);

const showToast = () => {
    toast.success(attributes.alertTitle, {
        description: attributes.alertMessage,
        duration: 2000,
    });
}

const markdownContext = import.meta.glob('/contents/pricing/!(index).md');
const markdownFiles = reactive([]);
const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map((path) =>
        path().then((module) => ({
            html: module.html,
            attributes: module.attributes,
        }))
    );
    markdownFiles.push(...(await Promise.all(importPromises)));
    markdownFiles.sort((a, b) => {
        return a.attributes.date < b.attributes.date ? 1 : -1;
    });

    loaded.value = true;
};

onMounted(async () => {
    await getFiles();
})
</script>
