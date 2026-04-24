<script setup>
import { reactiveOmit } from "@vueuse/core";
import { AvatarFallback } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps({
  delayMs: { type: Number, required: false },
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
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-muted text-muted-foreground rounded-full flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs',
        props.class,
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
