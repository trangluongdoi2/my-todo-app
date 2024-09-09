<template>
  <div class="h-100 p-10">
    <h1>Project Settings</h1>
    <div class="flex flex-col mt-2 gap-y-4">
      <AppInput 
        v-model="memberEmail"
        :rules="[rules.email]"
        label="Add member"
        placeHolder="Enter the email"
      />
      <app-button
        class="w-[100px] mt-2"
        :color="'#42B883'"
        :disable="!memberEmail" 
        @click="addMember"
      >
        Save
      </app-button>
      <h3>Current Members</h3>
      <v-data-table
        height="100%"
        fixed-header
        :headers="headers"
        :items="currentMembers"
        hide-default-footer
      >
        <template v-slot:loading>
          <v-skeleton-loader :type="`table-row@${100}`"></v-skeleton-loader>
        </template>
        <template v-slot:item.id="{ value }">
          <span class="item__id">{{ value }}</span>
        </template>
      </v-data-table>
    </div>
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