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
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', props.class)"
  >
    <slot />
  </div>
</template>
