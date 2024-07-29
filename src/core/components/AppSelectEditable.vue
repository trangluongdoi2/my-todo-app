<template>
  <AppSelect
    v-if="isEditable && !disabled"
    v-model:currentSelect="modelValue"
    variant="solo"
    hidden-details
    :items="options"
    @change="onChange"
  />
  <span
    v-else
    class="w-full"
    @click.stop="onClick"
    @dblclick.stop="dblClick"
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
:deep(.v-input) {
  .v-input__controls {
    height: 30px;
    .v-field {
      height: 30px;
    }
    .v-text-field .v-input__details {
      padding-inline: 0;
    }
  }
  .v-text-field .v-input__details {
    min-height: 0;
  }
  .v-input__details {
    min-height: 0;
  }
}
</style>