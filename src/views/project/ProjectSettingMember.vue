<template>
  <div class="h-100 p-4 pt-[2px]">
    <AppBreadcrumbs :items="breadcrumbItems" />
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
        :disable="true"
        :loading="isSendingInvitation"
        @click="sendInvitation"
      >
        Save
      </app-button>
      <p class="text-[14px] font-bold text-[#B6C2CF]">Current Members</p>
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
    <app-toast
      v-model="isShowNotification"
      :timeout="2000"
      location="top center"
    >
      <p class="">The invitation has been send!</p>
    </app-toast>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/authStore';
import ProjectApi from '@/modules/project/api/projectApi';
import AppInput from '@/core/components/AppInput.vue';
import AppBreadcrumbs, { BreadcrumbItem } from '@/core/components/AppBreadcrumbs.vue';
import { useGlobalStates } from '@/core/composables/useGlobalStates';

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const { projectId } = useGlobalStates();
const route = useRoute();
const rules = {
  email(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    return 'Must be a valid e-mail.'
  },
}

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

const memberEmail = ref<string>('');
const currentMembers = ref<any>()
const isLoadingGetMembers = ref<boolean>(false);
const isSendingInvitation = ref<boolean>(false);
const isShowNotification = ref<boolean>(false);

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    title: 'Projects',
    disabled: false,
    href: '/projects',
  },
  {
    title: projectId.value.toString(),
    disabled: false,
    href: `/projects/${projectId.value}`,
  },
  {
    title: 'Add member',
    disabled: true,
    href: '',
  }
]);

const currentProjectId = computed(() => Number(route.params?.projectId));

const sendInvitation = () => {
  if (currentProjectId.value) {
    isSendingInvitation.value = true;
    const input = {
      fromEmail: currentUser.value.email,
      destEmail: memberEmail.value,
      projectId: currentProjectId.value,
    }
    ProjectApi.sendInvitation(input)
      .catch(() => {
        isShowNotification.value = false;
      })
      .finally(() => {
        isSendingInvitation.value = false;
        isShowNotification.value = true;
      });
  }
}

const getMembersProject = async () => {
  const { projectId } = route.params;
  if (projectId) {
    isLoadingGetMembers.value = true;
    currentMembers.value = await ProjectApi.getMembersByProjectId(Number(projectId));
    isLoadingGetMembers.value = false;
  }
}

onMounted(() => {
  getMembersProject();
})
</script>