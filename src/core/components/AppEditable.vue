<template>
  <div class="h-full w-full min-h-[full]">
    <v-text-field
      v-if="isEditable && !disabled"
      ref="inputElement"
      class="input__content"
      variant="solo"
      v-model="modelValue"
      v-bind="$attrs"
      @blur="onChange"
      @keyup.enter.stop="$event.target.blur()"
      @keydown.delete.stop
    ></v-text-field>
    <span
      class="w-full"
      v-else
      @click.stop="onClick"
      @dblclick.stop="dblClick"
    >
      {{ modelValue || 'None' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { nextTick, PropType, ref } from 'vue';
import type { VTextField } from 'vuetify/components';
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type ValidationRule = UnwrapReadonlyArray<VTextField['rules']>

type TRules = {
  required: ValidationRule,
}

const inputElement = ref<HTMLInputElement>();
const isEditable = ref<boolean>(false);
const modelValue = defineModel();

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Object as PropType<TRules>,
  }
});

const emit = defineEmits(['change']);

const showEditable = () => {
  isEditable.value = true;
}

const onChange = () => {
  isEditable.value = false;
  emit('change');
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

</script>

<style lang="scss" scoped>
span {
  font-size: 0.75rem;
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
      padding: 0;
      padding: 0 0.25rem;
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