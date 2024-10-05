<template>
  <div v-if="loading">
    <app-skeleton-table />
  </div>
  <v-layout v-else class="overflow-hidden">
    <v-data-table
      class="todo-table"
      :headers="headers"
      :items="items"
      :items-per-page="100"
      :loading="loading"
      fixed-header
      height="100%"
    >
      <template v-slot:loading>
        <v-skeleton-loader :type="`table-row@${100}`"></v-skeleton-loader>
      </template>
      <template v-slot:item.id="{ value }">
        <span class="item__id">{{ value }}</span>
      </template>
      <template v-slot:item.priority="{ value }">
        <v-tooltip :text="value || 'HIGHEST'">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" :icon="`custom:${getPriority(value)}`"></v-icon>
            <span v-bind="props" class="pl-1 text-xs">{{ value }}</span>
          </template>
        </v-tooltip>
      </template>
      <template v-slot:item.todoStatus="{ value }">
        <div :style="{ color: getColor(value), fontWeight: 'bold' }">{{ value }}</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <p class="underline cursor-pointer" @click.stop="navigateToDetails(item?.id)">See Details</p>
      </template>
    </v-data-table>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="100"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="test"
    >
    <template v-slot:loading>
        <v-skeleton-loader :type="`table-row@${100}`"></v-skeleton-loader>
      </template>
      <template v-slot:item.id="{ value }">
        <span class="item__id">{{ value }}</span>
      </template>
      <template v-slot:item.priority="{ value }">
        <v-icon v-bind="props" :icon="`custom:${getPriority(value)}`"></v-icon>
        <span v-bind="props" class="pl-1 text-xs">{{ value }}</span>
      </template>
      <template v-slot:item.status="{ item }">
        <div :style="{ color: getColor(item.todoStatus), fontWeight: 'bold' }">{{ item.todoStatus }}</div>
      </template>
    </v-data-table-server>
  </v-layout>
</template>

<script setup lang="ts">
import { onMounted, defineProps, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Priority, TodoItem } from '@/types';
import { formatDateToDDMMYYY } from '@/common/date';

const props = defineProps({
  items: {
    type: Array as PropType<TodoItem[]>,
    default: () => ([])
  },
  loading: {
    type: Boolean,
    default: false,
  },
  itemPerPage: {
    type: Number,
    default: 10,
  },
});

const colorMap = {
  'DONE': '#7EE2B8',
  'PENDING': '#85B8FF',
  'INPROGESS': '#F9A8D4',
  'STUCK': '#FD9891',
}
const headers = [
  {
    title: 'ID',
    key: 'id',
    value: 'id',
  },
  {
    title: 'Priority',
    key: 'priority',
    value: 'priority',
  },
  {
    title: 'Created At',
    key: 'createdAt',
    value: item => formatDateToDDMMYYY(item.createdAt),
  },
  {
    title: 'Update At',
    key: 'updatedAt',
    value: item => formatDateToDDMMYYY(item.updatedAt),
  },
  {
    title: 'Status', value: 'todoStatus'
  },
  {
    title: 'Actions', value: 'actions',
  }
];

const iconPriorityMap = {
  'HIGHEST': 'highest',
  'HIGH': 'high',
  'MEDIUM': 'medium',
  'LOW': 'low',
}

const router = useRouter();

const itemsPerPage = ref<number>(10);
const search = ref<string>('');

const test = (options: any) => {
  console.log(options, 'options...');
}

const getColor = (status: string) => {
  return colorMap[status] || 'error';
}

const getPriority = (priority: Priority) => {
  return iconPriorityMap[priority] || 'highest';
}

const navigateToDetails = (todoId: string) => {
  router.push({
    name: 'todoDetails',
    params: {
      todoId,
    }
  });
}

onMounted(() => {
  console.log(props.items, 'props.items...');
});

</script>

<style lang="scss" scoped>
.todo-table {
  .item__id {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item__priority {
    font-size: 0.75rem;
  }
  // .text-light-green {
  //   color: red;
  // }
}
</style>