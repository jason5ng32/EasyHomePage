<template>
    <div>
        <Badge :variant="variant === 'panel' ? undefined : 'outline'" :class="badgeClass">
            {{ badge }}
        </Badge>
        <h2 :class="['section-heading', variant === 'panel' ? 'text-panel-foreground' : '']">
            {{ title }}
        </h2>
        <div
            v-if="descriptionHtml"
            v-html="descriptionHtml"
            :class="[
                'mt-8 max-w-xl text-base leading-8',
                variant === 'panel' ? 'text-panel-muted' : 'text-muted-foreground'
            ]"
        ></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { Badge } from '@/components/ui/badge';

const props = defineProps({
    badge: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    descriptionHtml: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        default: 'default',
    },
});

const badgeClass = computed(() => [
    'section-label h-auto',
    props.variant === 'panel'
        ? 'border-panel-label-border bg-panel-label text-panel-muted'
        : '',
]);
</script>
