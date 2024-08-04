<template>
  <div class="w-100 h-100 p-2 flex flex-col gap-y-2 bg-[#161A1D]">
    <div class="flex gap-x-2">
      <template v-for="n of 3" :key="n">
        <app-skeleton-item :height="20" class="w-[100px]" />
        <span v-if="n !== 3">/</span>
      </template>
    </div>
    <app-skeleton-item width="100" height="28" />
    <v-skeleton-loader type="list-item-two-line" />
    <div class="flex gap-x-2 mt-2 mb-2">
      <app-skeleton-image height="100" width="100" />
      <app-skeleton-image height="100" width="100" />
      <app-skeleton-image height="100" width="100" />
    </div>
    <app-skeleton-item type="list-item" width="100" height="28" />
    <app-skeleton-item type="paragraph" />
    <app-skeleton-item type="list-item" width="100" height="28" />
    <div class="flex flex-row gap-x-2 bg-[#212121]">
      <app-skeleton-item type="list-item" width="100" height="28" />
      <app-skeleton-item type="list-item" width="100" height="28" />
      <app-skeleton-item type="list-item" width="100" height="28" />
    </div>
    <template v-for="n of 4" :key="n">
      <div class="flex flex-row items-center justify-between gap-x-4">
        <v-skeleton-loader type="avatar" />
        <v-skeleton-loader class="flex-1" type="paragraph" />
      </div>
    </template>
  </div>
</template>