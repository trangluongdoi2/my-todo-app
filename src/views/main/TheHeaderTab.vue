<template>
  <div>
    <v-list class="flex bg-transparent" v-if="!mobileMode">
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
              <v-list-item v-for="childOption in item.children" :key="childOption.name" @click="childOption.event()">
                <div class="w-full flex justify-between items-center gap-4">
                  <span class="font-medium">{{ childOption.name }}</span>
                </div>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <p class="font-semibold" v-else>{{ item.name }}</p>
      </v-list-item>
    </v-list>
    <div v-else>
      <AppButton icon size="28" type="text" @click="onShowActionsDrawer">
        <v-icon color="#42B883" icon="custom:menu"></v-icon>
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppButton from '@/core/components/AppButton.vue';

defineProps({
  mobileMode: {
    type: Boolean,
    default: false,
  }
});

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
  },
];

const onShowActionsDrawer = () => {
  console.log('onShowActionsDrawer...');
};

</script>

<style lang="scss" scoped>
</style>