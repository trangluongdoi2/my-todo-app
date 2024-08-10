<template>
  <div class="dashboard__container">
    <div class="mt-[24px] mb-[1rem]">
      <h1 class="title">Your work</h1>
      <v-divider />
    </div>
    <div class="w-full flex flex-col gap-y-[0.75rem]">
      <div class="flex flex-1 items-center justify-between">
        <h2>Recent Projects</h2>
        <h2 class="link">
          <router-link :to="{ name: 'todo'}" >View all projects</router-link>
        </h2>
      </div>
      <div class="dashboard__projects w-full h-full">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
    <div class="w-full mt-[0.75rem]">
      <v-tabs v-model="tab">
        <v-tab
          v-for="item in items"
          :key="item"
          :text="item"
          :value="item"
        >
      </v-tab>
      </v-tabs>
      <v-divider />
      <div class="tab-content mt-[0.5rem] w-full">
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="Worked on">
            <p>
              Comming soon...
            </p>
          </v-tabs-window-item>
          <v-tabs-window-item value="Viewed">
            <p>
              Comming soon...
            </p>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from '@/modules/dashboard/components/ProjectCard.vue';
import { ref } from 'vue';

const tab = ref<any>('Worked on');
const items = [
  'Worked on',
  'Viewed',
]
</script>

<style scoped lang="scss">
.dashboard__container {
  width: 100%;
  height: 100%;
  padding: 0 40px;
  .dashboard__projects {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  h2.link {
    color: $green-base;
    line-height: 1.14286;
    font-weight: 500;
    letter-spacing: -0.003em;
    :hover {
      text-decoration: underline;
    }
  }
}
</style>