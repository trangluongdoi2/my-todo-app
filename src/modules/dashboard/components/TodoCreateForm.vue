<template>
 <v-form validate-on="blur lazy" @submit.prevent="submit">
    <AppInput v-model="todoForm.todoName" :isImperative="true" label="Name"></AppInput>
    <AppInput v-model="todoForm.title" label="Title"></AppInput>
    <AppInput v-model="todoForm.label" :isImperative="true" label="Label"></AppInput>
    <AppInput v-model="todoForm.description" :isImperative="true" label="Description"></AppInput>
    <v-select v-model="todoForm.priority" item-title="label" :items="listPriority">
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props">
          <template v-slot:prepend>
            <v-icon :icon="`custom:${item.raw.icon}`"></v-icon>
          </template>
        </v-list-item>
      </template>
    </v-select>
    <v-select v-model="todoForm.todoStatus" item-title="label" :items="listStatus">
      <div>{{ todoForm.todoStatus }}</div>
    </v-select>
  </v-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import AppInput from '@/core/components/AppInput.vue';
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

const todoForm = reactive(initIssue);

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

const listStatus = [
  { label: 'Pending', value: TodoStatus.PENDING },
  { label: 'In Progress', value: TodoStatus.IN_PROGESS },
  { label: 'Done', value: TodoStatus.DONE },
];

const submit = () => {
  console.log(todoForm, 'todoForm...');
}

watch(() => todoForm, () => {
  emit('change', todoForm);  
}, { immediate: true, deep: true });
</script>

<style lang="scss" scoped>

</style>