<template>
  <AppSelect
    class="app-select--editable"
    v-if="isEditable && !disabled"
    v-model:currentSelect="modelValue"
    variant="solo"
    :hide-details="true"
    :items="options"
    @change="onChange"
  />
  <span
    v-else
    class="w-full"
    @click="onClick"
    @dblclick="dblClick"
  >
    {{ modelValue || 'None' }}
  </span>
</template>

<script setup lang="ts">
import { nextTick, PropType, ref } from 'vue';
import AppSelect from './AppSelect.vue';

const props = defineProps({
  options: {
    type: Array as PropType<any>,
    default: () => ([]),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  singleClick: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['change']);

const isEditable = ref<boolean>(false);
const modelValue = defineModel();
const showEditable = () => {
  isEditable.value = true;
}

const onChange = () => {
  nextTick(() => {
    isEditable.value = false;
  });
}

const onClick = () => {
  if (props.disabled || !props.singleClick) {
    return;
  }
  showEditable();
}

const dblClick = () => {
  if (props.disabled) {
    return;
  }
  showEditable();
}
</script>

<style lang="scss" scoped>
span {
  font-size: 0.75rem;
}
.app-select--editable {
  :deep(.v-input__control) {
    .v-field {
      height: 30px;
      &__input {
        height: 30px;
        min-height: 30px;
        padding: 0 0.5rem;
      }
    }
    .v-field.v-field--variant-solo {
      background: $background-input-pressed;
      outline: 1px solid $green-base;
    }
  }
}
</style>