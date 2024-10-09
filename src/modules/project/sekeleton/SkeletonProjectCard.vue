<template>
  <div class="card-loading bg-[#22272B] w-[240px] h-[168px]">
    <div class="flex gap-x-1 items-center w-100">
      <v-skeleton-loader class="max-w-[28px] max-h-[28px] bg-transparent" type="avatar"/>
      <v-skeleton-loader class="flex-1 bg-transparent w-[100px]" type="paragraph" />
    </div>
    <v-skeleton-loader class="custom-paragraph bg-transparent" type="paragraph" />
  </div>
</template>
<style lang="scss" scoped>
:deep(.v-skeleton-loader__avatar) {
  max-width: 28px;
  max-height: 28px;
  min-width: 28px;
  min-height: 28px;
  margin: 0 8px;
}
.custom-paragraph {
  :deep(.v-skeleton-loader__paragraph) {
    .v-skeleton-loader__bone:first-child {
      margin-top: 0;
    }
  }
}
</style>
