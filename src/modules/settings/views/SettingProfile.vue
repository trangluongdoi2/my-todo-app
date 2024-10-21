<template>
  <div class="setting-wrapper pl-[20px] pr-[20px]">
    <header class="setting-header h-[192px] h-100bg-red-500">
      <div class="container-header w-full h-full" />
    </header>
    <div class="flex flex-row">
      <SettingsSidebar />
      <SettingsContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsSidebar from './SettingsSidebar.vue';
import SettingsContent from './SettingsContent.vue';
</script>
<style lang="scss" scoped>
$height-main-header: 60px;
.setting-wrapper {
  margin: 0 auto;
  max-width: 1200px;
  // min-height: calc(-$height-main-header + 100vh); 
  min-height: calc(-60px + 100vh);
  .setting-header {
    background-image: linear-gradient(to right, $green-base, $blue-base);
  }
}
</style>
