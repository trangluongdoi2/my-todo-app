<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="keepAliveExcludes">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  nameComponent: {
    type: Array as PropType<Array<string>>,
    default: () => [],
  }
})
const keepAliveExcludes = [''];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
