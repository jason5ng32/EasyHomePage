<template>
    <header class="fixed inset-x-0 top-3 z-50 px-3">
        <nav
            id="navbar-top"
            class="mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full border border-border/70 bg-background/85 px-3 shadow-sm backdrop-blur-xl"
        >
            <a class="flex min-w-0 items-center gap-3 rounded-full pr-3" href="#Introduce" @click="scrollToSection($event, 'Introduce')">
                <img :src="logo" alt="logo" class="size-9 rounded-full ring-1 ring-border">
                <span class="truncate text-sm font-black">{{ siteConfig.brand.name }}</span>
                <span v-if="versionLabel" class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground" :title="versionTitle">
                    {{ versionLabel }}
                </span>
            </a>

            <div class="hidden items-center gap-1 md:flex">
                <a
                    v-for="item in navItems"
                    :key="item.id"
                    :class="[
                        'rounded-full px-3 py-1.5 text-xs font-bold transition',
                        activeSection === item.id
                            ? 'bg-foreground text-background shadow-sm'
                            : 'text-muted-foreground hover:bg-foreground hover:text-background'
                    ]"
                    :href="`#${item.id}`"
                    :aria-current="activeSection === item.id ? 'page' : undefined"
                    @click="scrollToSection($event, item.id)"
                >
                    {{ item.label }}
                </a>
            </div>

            <Drawer v-model:open="mobileNavOpen" direction="bottom">
                <DrawerTrigger as-child>
                    <Button variant="ghost" size="icon" class="rounded-full md:hidden" aria-label="Open navigation">
                        <MenuIcon />
                    </Button>
                </DrawerTrigger>
                <DrawerContent class="max-h-[82svh] rounded-t-4xl">
                    <DrawerHeader class="px-5 text-left">
                        <DrawerTitle>{{ siteConfig.brand.name }}</DrawerTitle>
                        <DrawerDescription>{{ versionLabel ? `${versionTitle} ${versionLabel}` : siteConfig.site.description }}</DrawerDescription>
                    </DrawerHeader>
                    <div class="flex max-h-[60svh] flex-col gap-2 overflow-y-auto px-5 pb-6">
                        <DrawerClose v-for="item in navItems" :key="item.id" as-child>
                            <a
                                :class="[
                                    'rounded-xl px-3 py-3 text-sm font-bold transition hover:bg-muted hover:text-foreground',
                                    activeSection === item.id ? 'bg-muted text-foreground' : 'text-muted-foreground'
                                ]"
                                :href="`#${item.id}`"
                                :aria-current="activeSection === item.id ? 'page' : undefined"
                                @click="scrollToSectionFromDrawer($event, item.id)"
                            >
                                {{ item.label }}
                            </a>
                        </DrawerClose>
                    </div>
                </DrawerContent>
            </Drawer>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { MenuIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { navigationItems, resolveContentAsset, siteConfig } from '@/content/site';

const navItems = navigationItems;
const logo = resolveContentAsset(siteConfig.brand.logo);
const versionLabel = ref('');
const activeSection = ref(navItems[0]?.id || 'Introduce');
const mobileNavOpen = ref(false);
const versionTitle = siteConfig.profile.version.title || '';
let scrollFrame = null;

const calAge = () => {
    if (!siteConfig.profile.version.enabled || !siteConfig.profile.birthDate) {
        return;
    }

    const now = new Date();
    const birth = new Date(siteConfig.profile.birthDate);
    const diff = now.getTime() - birth.getTime();
    const ageInMilliseconds = new Date(diff);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    const ageInDecimal = ageInYears + (ageInMilliseconds.getMonth() / 12);
    versionLabel.value = `${siteConfig.profile.version.prefix || ''}${ageInDecimal.toFixed(2)}`;
};

const getScrollOffset = () => {
    const navbar = document.getElementById('navbar-top');
    if (!navbar) {
        return 88;
    }

    return Math.ceil(navbar.getBoundingClientRect().bottom + 12);
};

const scrollToSectionById = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) {
        return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
    activeSection.value = sectionId;

    window.history.pushState(null, '', `#${sectionId}`);
    window.scrollTo({
        top: Math.max(top, 0),
        behavior: 'smooth',
    });
};

const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    scrollToSectionById(sectionId);
};

const scrollToSectionFromDrawer = (event, sectionId) => {
    event.preventDefault();
    mobileNavOpen.value = false;

    window.requestAnimationFrame(() => {
        scrollToSectionById(sectionId);
    });
};

const updateActiveSection = () => {
    const offset = getScrollOffset() + 24;
    const sections = navItems
        .map((item) => ({
            id: item.id,
            element: document.getElementById(item.id),
        }))
        .filter((section) => section.element);

    if (!sections.length) {
        return;
    }

    const viewportBottom = window.scrollY + window.innerHeight;
    const documentBottom = document.documentElement.scrollHeight - 2;

    if (viewportBottom >= documentBottom) {
        activeSection.value = sections[sections.length - 1].id;
        return;
    }

    const current = sections.reduce((closest, section) => {
        const top = section.element.getBoundingClientRect().top - offset;

        if (top <= 0 && (!closest || top > closest.top)) {
            return { id: section.id, top };
        }

        return closest;
    }, null);

    activeSection.value = current?.id || sections[0].id;
};

const requestActiveSectionUpdate = () => {
    if (scrollFrame) {
        return;
    }

    scrollFrame = window.requestAnimationFrame(() => {
        updateActiveSection();
        scrollFrame = null;
    });
};

onMounted(() => {
    calAge();
    updateActiveSection();
    window.addEventListener('scroll', requestActiveSectionUpdate, { passive: true });
    window.addEventListener('resize', requestActiveSectionUpdate);
});

onUnmounted(() => {
    window.removeEventListener('scroll', requestActiveSectionUpdate);
    window.removeEventListener('resize', requestActiveSectionUpdate);

    if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
    }
});
</script>
