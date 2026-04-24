<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
});
</script>

<template>
  <div
    data-slot="sheet-header"
    :class="cn('gap-1.5 p-4 flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
