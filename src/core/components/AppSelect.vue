<template>
  <div class="select-wrapper">
    <div class="select__label" v-if="label">{{ label }}</div>
    <v-select 
      v-model="currentSelect"
      item-title="label" 
      :items="items"
      variant="solo"
      :hide-details="true"
    >
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" @click="onChange">
          <v-list-item-title>
            <slot :item="item.raw" />
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel, PropType } from 'vue';

type Items = {
  value?: any,
  label: any,
}
defineProps({
  items: {
    type: Array as PropType<Items[]>,
    required: true,
  },
  label: {
    type: String,
    default: '',
  }
});

const emit = defineEmits(['change']);

const onChange = (e: any) => {
  emit('change');
};

const currentSelect = defineModel('currentSelect');

</script>

<style lang="scss" scoped>
.select__label {
  font-size: 0.75rem;
  font-weight: 700;;
  color: $text;
  margin-bottom: 0.5rem;
}
:deep(.v-input__control) {
  .v-field {
    height: 36px;
    outline: 1px solid $border-input;
    &__input {
      height: 36px;
      min-height: 36px;
      padding: 0 0.5rem;
      .v-select__selection {
        &-text {
          font-size: 0.75rem;
          color: white;
        }
      }
      &__details {
        padding-inline: 0;
      }
    }
  }
  .v-field.v-field--variant-solo {
    background: $background-input-pressed;
  }
}
:deep(.v-input-details) {
  padding-inline: 0;
  min-height: 0;
}
</style>