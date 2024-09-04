<template>
  <div class="h-full overflow-hidden flex flex-col">
    <div class="flex gap-x-4">
      <div class="flex-1 flex gap-x-2">
        <app-skeleton-item width="60%"/>
        <app-skeleton-item class="flex-1" height="28"/>
      </div>
      <div class="flex flex-1 gap-x-2">
        <app-skeleton-item width="60%"/>
        <app-skeleton-item class="flex-1" height="28"/>
      </div>
      <div class="flex flex-1 gap-x-2">
        <app-skeleton-item width="60%"/>
        <app-skeleton-item class="flex-1" height="28"/>
      </div>
    </div>
    <div class="grid-container bg-[#212121] flex-1 mt-2">
      <template v-for="n of 12" :key="n">
        <app-skeleton-image />
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, 1fr));
  gap: 8px;
  height: 100%;
  grid-template-rows: repeat(auto-fit, 200px);
}
</style>