<template>
 <v-form validate-on="blur lazy" @submit.prevent="submit">
  <div>Project</div>
  <!-- <v-divider></v-divider> -->
    <!-- <AppInput v-model="todoForm.projects" :isImperative="true" label="Name"></AppInput> -->
    <AppSelect v-model:currentSelect="listProjects[0]" :items="listProjects" />
    <AppInput v-model="todoForm.todoName" :isImperative="true" label="Name"></AppInput>
    <AppInput v-model="todoForm.title" label="Title"></AppInput>
    <AppInput v-model="todoForm.label" :isImperative="true" label="Label"></AppInput>
    <AppInput v-model="todoForm.description" :isImperative="true" label="Description"></AppInput>
    <AppSelect v-model:currentSelect="todoForm.priority" :items="listPriority">
      <template v-slot:default="{ item }">
        {{ item.label }}
      </template>
    </AppSelect>
    <!-- <v-select v-model="todoForm.priority" item-title="label" :items="listPriority">
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <div class="flex pl-2 gap-x-1">
            <v-icon :icon="`custom:${item.raw.icon}`" size="20" />
            <div class="text-[0.75rem]">{{ item.raw.label }}</div>
          </div>
        </v-list-item>
      </template>
    </v-select>
    <v-select v-model="todoForm.todoStatus" item-title="label" :items="listStatus">
      <div>{{ todoForm.todoStatus }}</div>
    </v-select> -->
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import AppInput from '@/core/components/AppInput.vue';
import AppSelect from '@/core/components/AppSelect.vue';
import { TodoItem, Priority, TodoStatus } from '@/type';

const emit = defineEmits(['change']);

const initIssue: TodoItem = {
  projects: ['The First Project' + Math.floor(Math.random() * 10)],
  todoName: 'The First Issue' + Math.floor(Math.random() * 10),
  title: 'The My Title',
  label: 'The First Label' + Math.floor(Math.random() * 10),
  assignee: 'Nguyen Tan Vinh' + Math.floor(Math.random() * 10),
  description: 'This is the first description',
  priority: Priority.MEDIUM,
  todoStatus: TodoStatus.PENDING,
}

const projects = ['Project 1', 'Project 2', 'Project 3'];
// const currentProjects = 

const todoForm = reactive(initIssue);

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

const listProjects = [
{ label: 'Project 1' },
{ label: 'Project 2' },
{ label: 'Project 3' },
{ label: 'Project 4' },
]

const listStatus = [
  { label: 'Pending', value: TodoStatus.PENDING },
  { label: 'In Progress', value: TodoStatus.IN_PROGESS },
  { label: 'Done', value: TodoStatus.DONE },
];

const submit = () => {
  console.log(todoForm, 'todoForm...');
}

onMounted(() => {
  console.log('onMounted..');
})

watch(() => todoForm, () => {
  emit('change', todoForm);  
}, { immediate: true, deep: true });
</script>

<style lang="scss" scoped>
.test3 {
  :deep(.v-list-item) {
    .v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
      width: 1px;
    }
  }
}
</style>