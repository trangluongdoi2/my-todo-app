<template>
  <div class="flex-1 flex gap-x-4 overflow-hidden">
    <div class="flex-1 overflow-auto">
      <draggable
        class="flex flex-col h-full gap-y-2"
        group="todo"
        itemKey="id"
        v-bind="dragOptions"
        v-model="itemsPending"
        @change="handleDragged($event, TodoStatus.PENDING)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :item="element"

            @delete-item="$emit('delete-item', element)"
            @edit-item="$emit('edit-item', element)"
          />
        </template>
      </draggable>
    </div>
    <div class="flex-1">
      <draggable
        class="flex flex-col h-full gap-y-2"
        group="todo"
        itemKey="id"
        v-model="itemsInProgress"
        v-bind="dragOptions"
        @change="handleDragged($event, TodoStatus.IN_PROGESS)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :item="element"

            @delete-item="$emit('delete-item', element)"
            @edit-item="$emit('edit-item', element)"
          />
        </template>
      </draggable>
    </div>
    <div class="flex-1">
      <draggable
        class="flex flex-col h-full gap-y-2"
        group="todo"
        itemKey="id"
        v-model="itemsDone"
        v-bind="dragOptions"
        @change="handleDragged($event, TodoStatus.DONE)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :item="element"

            @delete-item="$emit('delete-item', element)"
            @edit-item="$emit('edit-item', element)"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, watch, computed } from "vue";
import { TodoItem, TodoStatus } from "@/types";
import draggable from "vuedraggable";
import TodoCard from "./TodoCard.vue";

const props = defineProps({
  items: {
    type: Array as PropType<any>,
    default: () => ([]),
  },
})

const emits = defineEmits<{
  (event: 'edit-item', item: TodoItem): void;
  (event: 'delete-item', item: TodoItem): void;
  (event: 'edit-item-status', item: TodoItem): void;
}>();

const draggedItem = ref<TodoItem>();
const oldStatus = ref<TodoStatus>();
const newStatus = ref<TodoStatus>();

const handleDragged = (event: any, status: TodoStatus) => {
  if (event['removed']) {
    return;
  }
  if (event['added']) {
    draggedItem.value = event['added'].element as TodoItem;
    newStatus.value = status;
  }
  if (event['removed']) {
    draggedItem.value = event['removed'].element as TodoItem;
    oldStatus.value = status;
  }
  if (draggedItem.value) {
    const newItem = {
      ...draggedItem.value,
      todoStatus: newStatus.value
    } as TodoItem;
    emits('edit-item-status', newItem);
  }
}

const itemsInProgress = ref<TodoItem[]>([]);
const itemsPending = ref<TodoItem[]>([]);
const itemsDone = ref<TodoItem[]>([]);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }
})

watch(() => props.items, () => {
  itemsInProgress.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.IN_PROGESS);
  itemsDone.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.DONE);
  itemsPending.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.PENDING);
}, { immediate: true, deep: true });

</script>
<style lang="scss" scoped>
</style>