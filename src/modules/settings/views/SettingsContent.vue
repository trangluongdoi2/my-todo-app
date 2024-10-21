<template>
  <div class="min-w-[240px] flex flex-col gap-y-2">
    <section class="container-worked-on min-h[200px]">
      <h2 class="font-bold">Worked on</h2>
      <div class="text-sm text-[#B6C2CF]">Others will only see what they can access.</div>
      <div class="bg-red-500 w-full h-full">

      </div>
    </section>
    <section class="container-projects">
      <h3 class="font-bold">Worked on</h3>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';
import { onBeforeMount, ref } from 'vue';
import ProjectApi from '@/modules/project/api/projectApi';
import { TProject } from '@/types/project';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const projects = ref<TProject[]>([]);

onBeforeMount(async () => {
  projects.value = await ProjectApi.getProjectsByUserId(currentUser.value.id);
  console.log(currentUser.value, 'onBeforeMount....');
  console.log(projects.value, 'onBeforeMount....');
});
</script>
<style lang="scss" scoped>
</style>
