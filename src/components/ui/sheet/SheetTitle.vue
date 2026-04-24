<script setup>
import { reactiveOmit } from "@vueuse/core";
import { DialogTitle } from "reka-ui";
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
  <DialogTitle
    data-slot="sheet-title"
    :class="cn('text-foreground font-medium cn-font-heading', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
