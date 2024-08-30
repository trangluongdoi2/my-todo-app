<template>
  <v-form validate-on="blur lazy" @submit.prevent="submit">
    <div class="flex flex-col gap-y-4">
      <AppInput v-model="projectForm.projectName" :required="true" label="Name" />
    </div>
  </v-form>
</template>
 
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import AppInput from '@/core/components/AppInput.vue';
import AppSelect from '@/core/components/AppSelect.vue';
import AppDragDropUpload from '@/core/components/AppDragDropUpload.vue';

const emit = defineEmits(['change']);

const initialProject: any = {
  projectName: 'The First Issue' + Math.floor(Math.random() * 10),
  members: [],
  todoItems: [],
}

const projectForm = reactive(initialProject);

const submit = () => {
  console.log(projectForm, 'projectForm...');
};

watch(() => projectForm, () => {
  emit('change', projectForm);  
}, { immediate: true, deep: true });

</script>