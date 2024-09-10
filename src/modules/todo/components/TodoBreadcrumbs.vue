<template>
  <div ref="breadCrumbEl" class="breadcrumbs__content p-[0.25rem]">
    <AppBreadcrumbs :items="currentItems"/>
    <v-divider />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { capitalize } from '@/common/string-utils';
import AppBreadcrumbs, { BreadcrumbItem } from '@/core/components/AppBreadcrumbs.vue';

const route = useRoute();
const currentItems= ref<BreadcrumbItem[]>([]);

const getBreadcrumbsItems = () => {
  const params = route.fullPath.split('/').filter(path => path);
  const data =  params.reduce((arr: any, path: string, index: number) => {
    const title = capitalize(path, true);
    const disabled = index === params.length - 1;
    const href = (arr[index - 1]?.href || '') + '/' + path;
    arr.push({
      title,
      disabled,
      href,
    })
    return arr;
  }, []);
  currentItems.value = data;
};

onMounted(() => {
  getBreadcrumbsItems();
});
</script>
<style lang="scss" scoped>
.breadcrumbs__content {
  height: 30px;
  background-color: $dark-base;
}
</style>