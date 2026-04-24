<script setup>
import { AvatarRoot } from "reka-ui";
import { cn } from "@/lib/utils";
import { avatarVariants } from ".";

const props = defineProps({
  class: {
    type: [Boolean, null, String, Object, Array],
    required: false,
    skipCheck: true,
  },
  size: { type: null, required: false },
});
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size ?? 'default'"
    :class="cn(avatarVariants({ size }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
