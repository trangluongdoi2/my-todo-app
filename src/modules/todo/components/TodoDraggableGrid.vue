<template>
  <div class="flex-1 flex gap-x-2 overflow-hidden">
    <div class="flex-1">
      <draggable
        class="draggable-container flex flex-col overflow-auto h-full p-2 gap-y-2"
        :class="{ 'drop-to': isDropTo['draggable-1'] }"
        group="todo"
        itemKey="id"
        v-bind="dragOptions"
        v-model="itemsPending"
        id="draggable-1"
        @start="handleStart"
        @move="handleMove"
        @end="resetDropEffect"
        @change="handleDragged($event, TodoStatus.PENDING)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :id="element.id"
            :item="element"
            :class="{ 'dragging': element.id === draggingId }"

            @delete-item="$emit('delete-item', element)"
            @edit-item="$emit('edit-item', element)"
          />
        </template>
      </draggable>
    </div>
    <div class="flex-1">
      <draggable
        class="draggable-container flex flex-col overflow-auto h-full p-2 gap-y-2"
        :class="{ 'drop-to': isDropTo['draggable-2'] }"
        group="todo"
        itemKey="id"
        id="draggable-2"
        v-bind="dragOptions"
        v-model="itemsInProgress"
        @start="handleStart"
        @move="handleMove"
        @end="resetDropEffect"
        @change="handleDragged($event, TodoStatus.IN_PRORGESS)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :item="element"
            :id="element.id"
            :class="{ 'dragging': element.id === draggingId }"

            @delete-item="$emit('delete-item', element)"
            @edit-item="$emit('edit-item', element)"
          />
        </template>
      </draggable>
    </div>
    <div class="flex-1">
      <draggable
        class="draggable-container flex flex-col overflow-auto h-full p-2 gap-y-2"
        :class="{ 'drop-to': isDropTo['draggable-3'] }"
        group="todo"
        itemKey="id"
        id="draggable-3"
        v-model="itemsDone"
        v-bind="dragOptions"
        @start="handleStart"
        @move="handleMove"
        @end="resetDropEffect"
        @change="handleDragged($event, TodoStatus.DONE)"
      >
        <template v-slot:item="{ element }">
          <TodoCard
            :item="element"
            :id="element.id"
            :class="{ 'dragging': element.id === draggingId }"

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
  (event: 'update-item-status', item: TodoItem): void;
}>();

const draggedItem = ref<TodoItem>();
const draggingId = ref<number>();
const oldStatus = ref<TodoStatus>();
const newStatus = ref<TodoStatus>();
const isDropTo = ref<{ [key: string]: boolean }>({
  'draggable-1': false,
  'draggable-2': false,
  'draggable-3': false,
});
const itemsInProgress = ref<TodoItem[]>([]);
const itemsPending = ref<TodoItem[]>([]);
const itemsDone = ref<TodoItem[]>([]);

const resetDropEffect = () => {
  isDropTo.value['draggable-1'] = false;
  isDropTo.value['draggable-2'] = false;
  isDropTo.value['draggable-3'] = false;
  draggingId.value = undefined;
}


const handleStart = (event: any) => {
  draggingId.value = Number(event.item.id);
}

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
    emits('update-item-status', newItem);
  }
}

const handleMove = (event: any) => {
  switch (event.to.id) {
    case 'draggable-1':
      isDropTo.value['draggable-1'] = true;
      isDropTo.value['draggable-2'] = false;
      isDropTo.value['draggable-3'] = false;
      break;
    case 'draggable-2':
      isDropTo.value['draggable-2'] = true;
      isDropTo.value['draggable-1'] = false;
      isDropTo.value['draggable-3'] = false;
      break;
    case 'draggable-3':
      isDropTo.value['draggable-3'] = true;
      isDropTo.value['draggable-1'] = false;
      isDropTo.value['draggable-2'] = false;
      break;
  }
}

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  }
});

const onDrag = (event: any) => {
  // console.log('onDrag', event.item);
}

// const checkMove = (event: any) => {
//   console.log(event['moved'], '=> event...');
// }

watch(() => props.items, () => {
  itemsInProgress.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.IN_PRORGESS);
  itemsDone.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.DONE);
  itemsPending.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.PENDING);
}, { immediate: true, deep: true });

</script>
<style scoped lang="scss">
.draggable-container {
  background-color: $surface-suken;
  border: 1px dashed transparent;
  .dragging {
    border: 2px solid $blue-base;
  }
}
.drop-to {
  border-radius: 0.25rem;
  border: 1px dashed $green-base;
}
</style>
