<template>
  <div class="dashboard__container">
    <div class="w-full flex flex-col items-center gap-y-[0.75rem]">
      <h1>Guest</h1>
      <h2>Comming soon...</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
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