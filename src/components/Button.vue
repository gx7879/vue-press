<template>
  <component
    :is="tag"
    :to="to"
    :type="buttonType"
    class="btn"
    :class="buttonStyle"
  >
    <slot />
  </component>
</template>

<script>
import useButton from "@/composables/useButton";

export default {
  props: {
    is: {
      type: String,
      default: "button",
    },
    variant: {
      type: String,
      default: "primary",
    },
    type: {
      type: String,
      default: "button",
    },
    to: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return { ...useButton(props) };
  },
};
</script>

<style></style>
