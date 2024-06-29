<template>
  <div class="container-header w-full flex items-center">
    <div class="header-icon">
      <AppButton variant="plain" color="white">
        To do App
      </AppButton>
    </div>
    <div class="header-middle flex-1">
      <div class="flex items-center space-between">
        <AppButton :color="'#42B883'" v-if="!isHiddenCreateIssueButton" @click="onCreateIssue">Create</AppButton>
        <AppButton :color="'#42B883'" v-else type="text" @click="onCreateIssue">
          <v-icon :icon="'mdi-plus'"/>
        </AppButton>
        <div class="min-w-0 flex-1 shrink-0"></div>
        <v-list class="flex">
          <v-list-item
            v-for="(item, i) in tabs"
            :key="i"
            :value="item.name"
            @click="item.event()"
            :append-icon="item?.children ? 'mdi-chevron-down' : ''"
          >
            <div v-if="item?.children">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <div v-bind="props">
                    {{ item.name }}
                  </div>
                </template>
                <v-list>
                  <v-list-item v-for="childOption in item.children" :key="childOption.name" @click="childOption.event()">
                    <div class="w-full flex justify-between items-center gap-4">
                      <span>{{ childOption.name }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div v-else>{{ item.name }}</div>
          </v-list-item>
        </v-list>
    </div>
  </div>
  <div class="header-right">
    <TheHeaderActions />
    </div>
  </div>
  <v-divider color="white" />
</template>

<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
import TheHeaderActions from './TheHeaderActions.vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import EventBus from '@/core/composables/useEventbus';

const router = useRouter();

const tabs = [
  {
    name: 'Dashboard',
    id: 1,
    event: () => {
      router.push('/dashboard');
    }
  },
  {
    name: 'Courses',
    id: 2,
    event: () => {
      router.push('/courses');
    }
  },
  {
    name: 'Demo',
    id: 3,
    children: [
      {
        name: 'HTML',
        event: () => {
          console.log('HTML');
        }
      },
      {
        name: 'CSS',
        event: () => {
          console.log('CSS');
        }
      },
      {
        name: 'Javascript',
        event: () => {
          console.log('Javascript');
        }
      }
    ],
    event: () => {
      router.push('/demo');
    }
  },
];

const isHiddenCreateIssueButton = ref<boolean>(false);

const onCreateIssue = () => {
  EventBus.emit('CREATE_ISSUE');
};

const checkHiddenCreateIssueButton = () => {
  isHiddenCreateIssueButton.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', checkHiddenCreateIssueButton);
  checkHiddenCreateIssueButton();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkHiddenCreateIssueButton);
});
</script>

<style lang="scss" scoped>
.v-list {
  background-color: transparent;
  :deep(.v-list-item__spacer) {
    display: none;
  }
}
.container-header {
  height: 60px;
  padding: 8px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  gap: 10px;
}
</style>

