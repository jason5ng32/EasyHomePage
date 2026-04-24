<template>
    <header class="fixed inset-x-0 top-3 z-50 px-3">
        <nav
            id="navbar-top"
            class="mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full border border-border/70 bg-background/85 px-3 shadow-sm backdrop-blur-xl"
        >
            <a class="flex min-w-0 items-center gap-3 rounded-full pr-3" href="#Introduce">
                <img :src="logo" alt="logo" class="size-9 rounded-full ring-1 ring-border">
                <span class="truncate text-sm font-black">{{ attributes.Name }}</span>
                <span class="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground" :title="attributes.AgeTitle">
                    v{{ age }}
                </span>
            </a>

            <div class="hidden items-center gap-1 lg:flex">
                <a
                    v-for="item in navItems"
                    :key="item"
                    class="rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:bg-foreground hover:text-background"
                    :href="`#${item}`"
                >
                    {{ attributes[item] }}
                </a>
            </div>

            <Sheet>
                <SheetTrigger as-child>
                    <Button variant="ghost" size="icon" class="rounded-full lg:hidden" aria-label="Open navigation">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" class="w-80">
                    <SheetHeader>
                        <SheetTitle>{{ attributes.Name }}</SheetTitle>
                        <SheetDescription>{{ attributes.AgeTitle }} v{{ age }}</SheetDescription>
                    </SheetHeader>
                    <div class="flex flex-col gap-2 px-4 pb-6">
                        <SheetClose v-for="item in navItems" :key="item" as-child>
                            <a
                                class="rounded-xl px-3 py-3 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                :href="`#${item}`"
                            >
                                {{ attributes[item] }}
                            </a>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MenuIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { attributes } from '/contents/nav.md';
import logo from '/contents/logo.png';

const navItems = ['Introduce', 'Conversations', 'Abilities', 'Jobs', 'Products', 'Works', 'Pricing', 'Footer'];
const age = ref(0);

const calAge = () => {
    const now = new Date();
    const birth = new Date('1987-11-06');
    const diff = now.getTime() - birth.getTime();
    const ageInMilliseconds = new Date(diff);
    const ageInYears = Math.abs(ageInMilliseconds.getUTCFullYear() - 1970);
    const ageInDecimal = ageInYears + (ageInMilliseconds.getMonth() / 12);
    age.value = ageInDecimal.toFixed(2);
};

onMounted(() => {
    calAge();
});
</script>
