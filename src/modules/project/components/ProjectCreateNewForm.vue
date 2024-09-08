<template>
  <v-form validate-on="blur lazy" @submit.prevent>
    <div class="flex flex-col gap-y-4">
      <AppInput v-model="projectForm.projectName" :required="true" label="Name" />
    </div>
  </v-form>
</template>
 
<script setup lang="ts">
import { reactive, watch } from 'vue';
import AppInput from '@/core/components/AppInput.vue';

const initialProject: any = {
  projectName: 'The First Issue' + Math.floor(Math.random() * 10),
  members: [],
}

const emit = defineEmits<{
  (e: 'change', data: any), 
}>()

const projectForm = reactive(initialProject);

watch(() => projectForm, () => {
  emit('change', projectForm);
}, { immediate: true, deep: true });

</script>