<template>
  <v-select v-model="currentSelect" item-title="label" :items="items">
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" @click="onChange">
        <v-list-item-title>
          <slot :item="item.raw" />
        </v-list-item-title>
      </v-list-item>
      <!-- <v-list-item v-bind="props">
        <slot :item="item.raw" />
      </v-list-item> -->
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { defineProps, defineModel, onMounted, PropType } from 'vue';

type Items = {
  value?: any,
  label: any,
}
defineProps({
  items: {
    type: Array as PropType<Items[]>,
    required: true,
  }
});

const emits = defineEmits(['change']);

const onChange = (e: any) => {
  console.log('onChange..');
}

onMounted(() => {
  console.log('onMounted AppSelect...')
})

const currentSelect = defineModel('currentSelect')

</script>

<style lang="scss" scoped>

</style>