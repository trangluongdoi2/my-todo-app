<template>
  <div class="main" :style="{ gridTemplateAreas: styleMain.gridTemplateAreas}">
    <div class="header">
      <TheHeader />
    </div>
    <div class="sidebar" v-if="!isHiddenSideLeft">
      <TheSidebar/>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from './TheHeader.vue';
import TheSidebar from './TheSidebar.vue';
import useTheme from '@/core/composables/useTheme';
import { useGlobalStates } from '@/core/composables/useGlobalStates';
import { getCurrentUser } from 'aws-amplify/auth';

const router = useRouter();
const { getTheme } = useTheme();
const { isHiddenSideLeft } = useGlobalStates();

const styleMain = computed(() => {
  const styles: { [key: string]: string } = {
    gridTemplateAreas: `
      "header header header"
      "sidebar content content"`,
  };
  if (isHiddenSideLeft.value) {
    styles.gridTemplateAreas = `
      "header header header"
      "content content content"`;
  }
  return styles;
});

onMounted(async () => {
  getTheme();
  console.log('onMounted...');
  try {
    const user = await getCurrentUser();
    if (user) {
      router.push({ name: 'dashboard' });
    } else {
      router.push({ name: 'auth' });
    }
  } catch (error) {
    router.push({ name: 'auth' });
  }
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    'header header header'
    'sidebar content content'
  ;
  .header {
    grid-area: header;
  }
  .sidebar {
    grid-area: sidebar;
  }
  .content {
    grid-area: content;
    overflow: hidden;
  }

}
</style>

