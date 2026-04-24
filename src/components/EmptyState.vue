<template>
    <div
        :class="[
            'rounded-[2rem] border p-8 text-center',
            variant === 'panel'
                ? 'border-panel-border bg-panel-card text-panel-foreground'
                : 'border-border bg-card text-card-foreground'
        ]"
        role="status"
    >
        <p class="text-lg font-black">{{ title || siteConfig.site.emptyStateTitle }}</p>
        <p
            :class="[
                'mx-auto mt-3 max-w-xl text-sm leading-7',
                variant === 'panel' ? 'text-panel-muted' : 'text-muted-foreground'
            ]"
        >
            {{ description || siteConfig.site.emptyStateDescription }}
        </p>
    </div>
</template>

<script setup>
import { siteConfig } from '@/content/site';

defineProps({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        default: 'default',
    },
});
</script>
