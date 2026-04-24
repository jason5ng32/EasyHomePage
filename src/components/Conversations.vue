<template>
    <section class="section-block bg-background" id="Conversations">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <div>
                    <Badge variant="outline" class="section-label h-auto">{{ attributes.Badge }}</Badge>
                    <h2 class="section-heading slash-title">一些关于他的描述。</h2>
                </div>
                <p class="section-lead">
                    从家庭、互联网、工作、兴趣到个人特质，这些片段拼出一个更完整的人。
                </p>
            </div>

            <div v-if="loaded" class="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <article
                    v-for="(file, index) in markdownFiles"
                    :key="index"
                    :class="[
                        'reveal-up min-h-[260px] rounded-3xl border bg-card p-5 text-card-foreground elevated',
                        index === 0 ? 'md:col-span-2 xl:col-span-2 xl:row-span-2' : '',
                        index === 4 ? 'md:col-span-2 xl:col-span-2' : ''
                    ]"
                >
                    <div class="flex items-center justify-between gap-4">
                        <Avatar class="size-14 ring-2 ring-background">
                            <AvatarImage :src="file.attributes.avatar" alt="avatar" />
                            <AvatarFallback>JN</AvatarFallback>
                        </Avatar>
                        <div class="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                            {{ String(index + 1).padStart(2, '0') }}
                        </div>
                    </div>
                    <div
                        :class="[
                            'mt-8 content-copy text-foreground',
                            index === 0 ? 'text-xl leading-9 md:text-2xl md:leading-10' : ''
                        ]"
                        v-html="file.html"
                    ></div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { attributes } from '/contents/conversations/index.md';

const loaded = ref(false);
const markdownContext = import.meta.glob('/contents/conversations/!(index).md');
const imageModules = import.meta.glob('/contents/conversations/images/*', { eager: true });
const markdownFiles = reactive([]);

const getFiles = async () => {
    const importPromises = Object.values(markdownContext).map(async (loadMarkdown) => {
        const module = await loadMarkdown();
        const attributes = module.attributes;
        const imagePathKey = Object.keys(imageModules).find(key => key.includes(attributes.avatar));
        const imageUrl = imagePathKey ? imageModules[imagePathKey].default : null;

        return {
            html: formatHtml(module.html),
            attributes: {
                ...attributes,
                avatar: imageUrl
            }
        };
    });

    markdownFiles.push(...(await Promise.all(importPromises)));
    markdownFiles.sort((a, b) => b.attributes.date - a.attributes.date);
    loaded.value = true;
};

const formatHtml = (content) => {
    return content.toString()
        .replace(/<li>/g, '<span class="conversation-tag">')
        .replace(/<\/li>/g, '</span>')
        .replace(/<ul>/g, '')
        .replace(/<\/ul>/g, '');
};

onMounted(async () => {
    await getFiles();
})
</script>
