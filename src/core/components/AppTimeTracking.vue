<template>
  <v-progress-linear
    v-model="trackValue"
    color="#42B883"
  ></v-progress-linear>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';

// let interVal;

// const trackValue = ref<number>(0);
onMounted(() => {
  // console.log();
  // clearInterval(interVal);
  // interVal = setInterval(() => {
  //   console.log('setInterval...');
  //   trackValue.value = Math.floor(Math.random() * 10);
  // }, 3 * 1000);
});

const trackValue = defineModel('time', { type: Number, default: 50 });

watch(trackValue, () => {
  console.log(trackValue.value, 'trackValye..');
}, {immediate: true});

</script>

<style scoped>

</style>