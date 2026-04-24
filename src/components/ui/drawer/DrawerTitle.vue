<script setup>
import { reactiveOmit } from "@vueuse/core";
import { DrawerTitle } from "vaul-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
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
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="delegatedProps"
    :class="cn('text-foreground font-medium cn-font-heading', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>
