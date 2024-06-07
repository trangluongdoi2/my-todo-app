<template>
  <v-btn @click="handleClick" v-bind="{...$attrs}">
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('clicked');
}
</script>

<style scoped>

</style>