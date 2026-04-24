<script setup>
import { reactiveOmit } from "@vueuse/core";
import { DrawerOverlay } from "vaul-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  forceMount: { type: Boolean, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="delegatedProps"
    :class="
      cn(
        'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50',
        props.class,
      )
    "
  />
</template>
