<template>
  <div class="h-100 p-4">
   Overview
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppInput from '@/core/components/AppInput.vue';
import projectApi from '@/modules/project/api/projectApi';

const route = useRoute();
const memberEmail = ref<string>('');
const rules = {
  email(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    return 'Must be a valid e-mail.'
  },
}

const currentMembers = ref<any>()
const isLoadingGetMembers = ref<boolean>(false);
const headers = [
{
    title: 'ID',
    key: 'id',
    value: 'id',
  },
  {
    title: 'Email',
    key: 'email',
    value: 'email',
  },
  {
    title: 'UserName',
    key: 'usernameid',
    value: 'username',
  },
  {
    title: 'Role',
    key: 'role',
    value: 'role',
  },
];

const addMember = () => {
  console.log(memberEmail.value, 'addMember..');
  // projectApi.
}
const getMembersProject = async () => {
  const { projectId } = route.params;
  if (projectId) {
    isLoadingGetMembers.value = true;
    currentMembers.value = await projectApi.getMembersByProjectId(Number(projectId));
    isLoadingGetMembers.value = false;
  }
}
onMounted(() => {
  getMembersProject()
})
</script>

<style scoped>

</style>