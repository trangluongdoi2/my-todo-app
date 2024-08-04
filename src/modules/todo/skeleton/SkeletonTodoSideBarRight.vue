<template>
  <div class="w-[500px] p-2 h-100 flex flex-col gap-y-4 bg-[#161A1D]">
    <app-skeleton-button width="80" height="30"/>
    <template v-for="n of 10" :key="n">
      <div class="flex items-center justify-between bg-[#212121] rounded-[2px]">
        <app-skeleton-item width="170" height="40"/>
        <app-skeleton-item width="60%" height="40"/>
      </div>
    </template>
  </div>
</template>