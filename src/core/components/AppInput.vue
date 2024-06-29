<template>
  <div class="input-wrapper">
    <label v-if="label" class="input__label">
      <span v-if="isImperative" class="text-red-500">*</span>
      {{ label }}
    </label>
    <v-text-field
      class="input__content"
      v-model="inputValue"
      v-bind="$attrs"
      @blur="onChange"
    ></v-text-field>
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, defineModel } from 'vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  isImperative: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['change']);

const inputValue = defineModel({
  type: String,
  required: true,
})

const onChange = (e: FocusEvent) => {
  inputValue.value = (e.target as any).value || '';
  emit('change', inputValue.value);
}
</script>

<style lang="scss" scoped>

</style>