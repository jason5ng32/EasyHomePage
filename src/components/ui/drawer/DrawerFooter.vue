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
    data-slot="drawer-footer"
    :class="cn('gap-2 p-4 mt-auto flex flex-col', props.class)"
  >
    <slot />
  </div>
</template>
