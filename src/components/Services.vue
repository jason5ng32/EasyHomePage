<template>
    <section class="section-block bg-panel text-panel-foreground" id="Services">
        <div class="site-frame">
            <div class="mb-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                <SectionHeader :badge="section.badge" :title="section.title" variant="panel" />
            </div>

            <EmptyState v-if="!services.length" variant="panel" />

            <div v-else class="grid gap-4 md:grid-cols-3">
                <article
                    v-for="service in services"
                    :key="service.title"
                    :class="[
                        'reveal-up flex min-h-[520px] flex-col rounded-[2rem] border p-6 transition hover:-translate-y-1',
                        service.featured
                            ? 'border-accent bg-accent text-accent-foreground shadow-2xl'
                            : 'border-panel-border bg-panel-card text-panel-foreground'
                    ]"
                >
                    <div>
                        <h3 class="text-4xl font-black leading-none">{{ service.title }}</h3>
                        <p
                            :class="[
                                'mt-4 text-sm leading-7',
                                service.featured ? 'text-accent-foreground opacity-70' : 'text-panel-muted'
                            ]"
                        >
                            {{ service.subtitle }}
                        </p>
                    </div>

                    <ul class="mt-8 flex flex-col gap-3">
                        <li v-for="item in service.includes" :key="item" class="flex gap-3 text-sm">
                            <CheckCircleIcon class="mt-0.5 size-4 shrink-0" />
                            <span>{{ item }}</span>
                        </li>
                        <li
                            v-for="item in service.excludes"
                            :key="item"
                            :class="[
                                'flex gap-3 text-sm',
                                service.featured ? 'text-accent-foreground opacity-55' : 'text-panel-subtle'
                            ]"
                        >
                            <XCircleIcon class="mt-0.5 size-4 shrink-0" />
                            <span>{{ item }}</span>
                        </li>
                    </ul>

                    <Button
                        v-if="service.price"
                        class="mt-auto w-full rounded-full cursor-pointer"
                        :variant="service.featured ? 'outline' : 'secondary'"
                        @click="showToast"
                    >
                        {{ service.price }}
                    </Button>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
import { toast } from 'vue-sonner';
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { servicesSection as section } from '@/content/sections';

const services = section.items || [];

const showToast = () => {
    toast.success(section.alertTitle, {
        description: section.alertMessage,
        duration: 2000,
    });
};
</script>
