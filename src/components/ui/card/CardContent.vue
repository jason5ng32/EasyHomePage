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
    data-slot="card-content"
    :class="cn('px-6 group-data-[size=sm]/card:px-4', props.class)"
  >
    <slot />
  </div>
</template>
