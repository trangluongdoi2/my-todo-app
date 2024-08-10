<template>
  <div class="project-card flex bg-[#22272B] w-[240px] h-[168px]">
    <v-avatar size="28" class="project-logo" :image="AvatarUrl" />
    <div class="flex flex-1 flex-col">
      <div class="flex flex-1 flex-col pt-[1rem] pl-[16px] pr-[12px]">
        <p>Corjl</p>
        <p class="sub-title">From Project 1</p>
        <div class="flex justify-between">
          <p class="sub-title p-[4px] pl-0">My open issues</p>
          <v-chip label class="w-fit">7</v-chip>
        </div>
        <div class="flex justify-between">
          <p class="sub-title p-[4px] pl-0">Done issues</p>
          <v-chip label class="w-fit">7</v-chip>
        </div>
      </div>
      <v-divider />
      <div class="h-[29px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
</script>

<style scoped lang="scss">
.project-card {
  border: none;
  border-left: 20px solid #A1BDD914;
  border-radius: 3px;
  position: relative;
  box-shadow: 0 2px 4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31);
  &:hover {
    outline: 0.03125rem solid $border-input;
  }
  p {
    color: $text;
    font-weight: bold;
  }
  p.sub-title {
    font-size: 11px;
  }
  .project-logo {
    position: absolute;
    top: 20px;
    left: -16px;
  }
  .v-chip {
    height: fit-content;
    // height: 8px;
    border-radius: 0.75rem;
  }
}
</style>