<template>
  <AppModal
    v-model:visible="visible"
    titleOk="Create Todo"
    title="Create"
    max-width="50%"
  >
    <template v-slot:default>
      <TodoCreateForm @change="onChange"/>
    </template>
    <template v-slot:actions>
      <!-- <div></div> -->
       <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
        <v-btn variant="text" @click="handleCancel">
          Cancel
        </v-btn>
        <v-btn color="#42B883" :loading="loadingSubmit" @click="handleOk">
          Create Todo
        </v-btn>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '@/core/components/AppModal.vue';
import TodoCreateForm from './TodoCreateForm.vue';
import IssuesApi from '../api/issues';

const visible = defineModel('visible', { type: Boolean, default: false });
const loadingSubmit = ref<boolean>(false);

const issueData = ref();

const onChange = (data: any) => {
  issueData.value = data;
};

const handleOk = () => {
  console.log(issueData.value, 'issueData.value..');
  loadingSubmit.value = true;
  IssuesApi.createIssue(issueData.value)
    .then((res) => {
      console.log(res, 'res..');
    })
    .finally(() => {
      loadingSubmit.value = false;
      visible.value = false;
    });
};

const handleCancel = () => {
  visible.value = false;
};

</script>

<style lang="scss" scoped>

</style>