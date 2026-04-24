<template>
    <header class="fixed inset-x-0 top-3 z-50 px-3">
        <nav
            id="navbar-top"
            class="mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full border border-border/70 bg-background/85 px-3 shadow-sm backdrop-blur-xl"
        >
            <a class="flex min-w-0 items-center gap-3 rounded-full pr-3" href="#Introduce" @click="scrollToSection($event, 'Introduce')">
                <img :src="logo" alt="logo" class="size-9 rounded-full ring-1 ring-border">
                <span class="truncate text-sm font-black">{{ attributes.Name }}</span>
                <span class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground" :title="attributes.AgeTitle">
                    v{{ age }}
                </span>
            </a>

            <div class="hidden items-center gap-1 md:flex">
                <a
                    v-for="item in navItems"
                    :key="item"
                    :class="[
                        'rounded-full px-3 py-1.5 text-xs font-bold transition',
                        activeSection === item
                            ? 'bg-foreground text-background shadow-sm'
                            : 'text-muted-foreground hover:bg-foreground hover:text-background'
                    ]"
                    :href="`#${item}`"
                    :aria-current="activeSection === item ? 'page' : undefined"
                    @click="scrollToSection($event, item)"
                >
                    {{ attributes[item] }}
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
                        <DrawerTitle>{{ attributes.Name }}</DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div class="flex max-h-[60svh] flex-col gap-2 overflow-y-auto px-5 pb-6">
                        <DrawerClose v-for="item in navItems" :key="item" as-child>
                            <a
                                :class="[
                                    'rounded-xl px-3 py-3 text-sm font-bold transition hover:bg-muted hover:text-foreground',
                                    activeSection === item ? 'bg-muted text-foreground' : 'text-muted-foreground'
                                ]"
                                :href="`#${item}`"
                                :aria-current="activeSection === item ? 'page' : undefined"
                                @click="scrollToSectionFromDrawer($event, item)"
                            >
                                {{ attributes[item] }}
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
import { attributes } from '/contents/nav.md';
import logo from '/contents/logo.png';

const navItems = ['Introduce', 'Stories', 'Skills', 'Jobs', 'Products', 'Works', 'Services', 'Footer'];
const age = ref(0);
const activeSection = ref('Introduce');
const mobileNavOpen = ref(false);
let scrollFrame = null;

const calAge = () => {
    const now = new Date();
    const birth = new Date('1987-11-06');
    const diff = now.getTime() - birth.getTime();
    const ageInMilliseconds = new Date(diff);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    const ageInDecimal = ageInYears + (ageInMilliseconds.getMonth() / 12);
    age.value = ageInDecimal.toFixed(2);
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
            id: item,
            element: document.getElementById(item),
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
