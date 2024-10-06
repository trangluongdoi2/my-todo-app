<template>
  <div class="input-wrapper">
    <div v-if="label" class="input__label">
      <span v-if="required" class="text-[#FD9891]">*</span>
      {{ label }}
    </div>
    <v-textarea
      class="input__content"
      v-model="inputValue"
      variant="solo"
      v-bind="$attrs"
      :hide-details="true"
      @blur="onChange"
    />
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, defineModel } from 'vue';

defineProps({
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
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
.input-wrapper {
  .input__label {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: $text;
  }
}
:deep(.v-input) {
  .v-field {
    padding: 0;
    font-size: 0.75rem;
    height: inherit;
    outline: 1px solid $border-input;
    &--focused {
      outline: 1px solid $green-base;
    }
    &__input {
      padding: 0.8125rem 0.5rem;
      font-size: 0.75rem;
      min-height: 100px;
      height: 100px;
    }
  }
  .v-input__details {
    padding-inline: 0;
  }
  .v-field.v-field--variant-solo {
    background: $background-input-pressed;
  }
}
:deep(.v-input--error) {
  .v-field {
    outline: 1px solid $red-base;
    &:focus {
      outline: 1px solid $red-base;
    }
  }
}
</style>