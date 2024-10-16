<template>
  <div
    class="h-full w-full min-h-[full] editable-container"
    @click="onClick"
    @dblclick="dblClick"
    v-click-outside="onClickOutSide"
  >
    <v-text-field
      v-if="isEditable && !disabled"
      ref="inputElement"
      class="input__content"
      v-bind="$attrs"
      variant="solo"
      v-model="modelValue"
      @blur="onChange"
      @keyup.enter.stop="$event.target.blur()"
      @keydown.delete.stop
    />
    <p v-else class="editable-display w-full h-full" :title="displayValue || 'None'">
      {{ modelValue || 'None' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { VTextField } from 'vuetify/components';

type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type ValidationRule = UnwrapReadonlyArray<VTextField['rules']>

type TRules = {
  required: ValidationRule,
}

const inputElement = ref<HTMLInputElement>();
const isEditable = ref<boolean>(false);
const modelValue = defineModel({
  type: String,
});

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object as PropType<TRules>,
  },
  displayValue: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['change']);

const showEditable = () => {
  if (!isEditable.value) {
    isEditable.value = true;
  }
}

const onChange = () => {
  isEditable.value = false;
  emit('change', modelValue.value);
}

const onClick = () => {
  if (props.disabled) {
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

const onClickOutSide = () => {
  isEditable.value = false;
  emit('change', modelValue.value);
}

</script>

<style lang="scss" scoped>
.editable-container {
  border-radius: 0.25rem;
  height: 30px;
  &:hover {
    background-color: $background-input-pressed;
  }
  p {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
:deep(.v-input) {
  height: 30px;
  .v-field {
    padding: 0;
    font-size: 0.75rem;
    height: inherit;
    &__input {
      height: 30px;
      min-height: 30px;
      padding-inline: 0;
      padding: 0 0.5rem;
      margin-top: -1px;
      font-size: 0.75rem;
    }
    .v-input__control {
      height: 30px;
    }
    .v-text-field .v-input__details {
      padding-inline: 0;
    }
    .v-input__details {
      min-height: 0;
    }
  }
  .v-field.v-field--variant-solo {
    background: $background-input-pressed;
    outline: 1px solid $green-base;
  }
}
</style>