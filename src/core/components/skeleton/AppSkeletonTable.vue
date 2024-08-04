<template>
  <div class="bg-[#212121]">
    <div class="flex flex-col" v-for="n of 8" :key="n">
       <div class="flex">
         <template v-for="m of 6" :key="m">
           <app-skeleton-item class="flex-1"/>
         </template>
       </div>
      <v-divider />
    </div>
    <div class="flex justify-end">
      <app-skeleton-item width="60%"/>
    </div>
  </div>
</template>

<style scoped>

</style>