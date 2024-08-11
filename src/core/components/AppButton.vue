<template>
  <v-btn class="app-button" v-bind="$attrs" >
    <slot />
    <template v-slot:prepend>
      <slot name="prepend" />
    </template>
    <template v-slot:append>
      <slot name="append" />
    </template>
  </v-btn>
</template>
<script lang="ts" setup>
defineProps({
  textColor: {
    type: String, 
    default: '#ffffff',
  }
});
</script>
<style scoped lang="scss">
.app-button {
  &:hover {
    cursor: pointer;
  }
  :deep(.v-btn__content) {
    color: v-bind(textColor)
  }
}
.app-button.v-btn--variant-outline {
  outline: 0.03125rem solid $border-input;
}
</style>
