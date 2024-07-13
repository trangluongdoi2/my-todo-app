<template>
  <v-text-field
    v-if="isEditable && !disabled"
    ref="inputElement"
    class="input__content"
    v-model="modelValue"
    v-bind="$attrs"
    :rules="[rules.required]"
    @blur="onChange"
    @keyup.enter.stop="$event.target.blur()"
    @keydown.delete.stop
  ></v-text-field>
  <span
    v-else
    @click.stop="onClick"
    @dblclick.stop="dblClick"
  >
    {{ modelValue }}
  </span>
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
  nextTick(() => {
    console.log(inputElement.value, 'inputElement.value//');
  })
}

const onChange = (data: any) => {
  isEditable.value = false;
  console.log(modelValue.value, 'modelValue...');
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
  .v-field {
    padding: 0;
    font-size: 0.75rem;
    &__input {
      height: 20px;
      min-height: 20px;
      padding: 0;
      padding: 0 0.25rem;
      font-size: 0.75rem;
    }
    .v-input__control {
      height: 20px;
    }
  }
}
</style>