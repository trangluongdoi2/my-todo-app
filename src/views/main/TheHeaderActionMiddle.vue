<template>
  <div class="w-full flex flex-1 gap-x-2 items-center">
    <v-list class="flex items-center justify-between bg-transparent">
      <v-list-item
        v-for="(item, i) in tabs"
        :key="i"
        :value="item.name"
        @click="item.event && item.event()"
        :append-icon="item?.children ? 'mdi-chevron-down' : ''"
      >
        <div v-if="item?.children">
          <v-menu>
            <template v-slot:activator="{ props }">
              <p v-bind="props" class="font-semibold">
                {{ item.name }}
              </p>
            </template>
            <v-list>
              <v-list-item
                v-for="childOption in item.children" 
                :key="childOption.name"
                @click="childOption.event && childOption.event()"
              >
                <div class="w-full flex items-center gap-4">
                  <span class="font-medium">{{ childOption.name }}</span>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div v-else class="font-semibold">{{ item.name }}</div>
      </v-list-item>
    </v-list>
    <app-button
      v-if="!isMobileScreen"
      class="button-create"
      :color="'#42B883'"
      @click="onCreateIssue"
    >
      <span class="text-[#ffffff] font-semibold">CREATE</span>
    </app-button>
    <app-button
      v-else
      class="button-create"
      :color="'#42B883'"
      @click="$emit('create-todo')"
    >
      <v-icon :icon="'mdi-plus'"/>
    </app-button>
    <div class="min-w-0 flex-1 shrink-0"></div>
    <TheHeaderTab :mobileMode="isMobileScreen"/>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Tab } from '@/types';
import { useResizeScreen } from '@/core/composables/useResizeScreen';
import TheHeaderTab from './TheHeaderTab.vue';

const router = useRouter();
const { isMobileScreen } = useResizeScreen();

const emit = defineEmits(['create-todo', 'create-project']);

const onCreateIssue = () => {
  emit('create-todo');
};

const tabs: Tab[] = [
  {
    name: 'Your works',
    id: 1,
    children: [
      {
        name: 'Go to your work space',
        event: () => {
          router.push('/dashboard');
        },
      }
    ],
  },
  {
    name: 'Projects',
    id: 2,
    children: [
      {
        name: 'View all projects',
        event: () => {
          router.push('/dashboard');
        },
      },
      {
        name: 'Create new project',
        event: () => {
          emit('create-project');
        },
      }
    ],
  },
];
</script>