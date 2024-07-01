<template>
  <div class="test flex gap-x-4">
    <div class="column1 flex-1">
      <h1>Draggable 1</h1>
      <Draggable
        class="flex flex-col gap-y-2"
        v-model="list1"
        group="people"
        @change="log"
        @start="onDragStart"
        @end="onDragEnd"
        itemKey="name"
      >
        <template v-slot:item="{ element, index }">
          <div class="w-full h-[40px] bg-light-green">{{ element.name }} {{ index }}</div>
        </template>
      </Draggable>
    </div>
    <div class="column2 flex-1">
      <h1>Draggable 2</h1>
      <Draggable
        class="flex flex-col gap-y-2"
        :list="list2"
        group="people"
        @change="log"
        @start="onDragStart"
        @end="onDragEnd"
        itemKey="name"
      >
        <template v-slot:item="{ element, index }">
          <div class="w-full h-[40px] bg-light-green">{{ element.name }} {{ index }}</div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, PropType, onMounted } from "vue";
import { TodoItem } from "@/type";
import * as Draggable from "vuedraggable";
import TodoCard from "./TodoCard.vue";
// TodoCard

const props = defineProps({
  items: {
    type: Array as PropType<any>,
    default: () => ([]),
  },
})

const itemsInProgress = ref<TodoItem[]>([]);
const itemsDone = ref<TodoItem[]>([]);
const itemsTodo = ref<TodoItem[]>([]);

// const list1 = ref<any>([]);
// const list2 = ref<any>([]);

const list1 = [
  { name: "John", id: 1 },
  { name: "Joao", id: 2 },
  { name: "Jean", id: 3 },
  { name: "Gerard", id: 4 }
];

const list2 = [
  { name: "Juan", id: 5 },
  { name: "Edgard", id: 6 },
  { name: "Johnson", id: 7 }
]

const log = () => {
  console.log('log...');
}

const onDragStart = (event: { oldIndex: number, newIndex: number }) => {
  console.log(event, 'event...');
  console.log('onDragStart..');
  [list1[event.oldIndex], list1[event.newIndex]] = [list1[event.newIndex], list1[event.oldIndex]]
}

const onDragEnd = (event: any) => {
  console.log(event, 'event 1...');
  console.log('onDragStart..');
}

const onDeleteItem = (item: TodoItem) => {
  console.log('onDeleteItem...');
}

const onEditItem = (item: TodoItem) => {
  console.log('onEditItem...');
}

onMounted(() => {
  console.log(props.items,);
  // itemsInProgress.value = props.items.filter((item: any) => item.status === 'PENDING');
  // itemsDone.value = props.items.filter((item: any) => item.status === 'DONE');
  // itemsTodo.value = props.items.filter((item: any) => item.status === 'TODO');
});
</script>

<style lang="scss" scoped>
.test {
  display: grid;
  grid-template-columns: repeat(3, minmax(10rem, 1fr));
  gap: 10px;
  height: 100%;
}
</style>