<template>
  <aside class="setting-sidebar">
    This is my sidebar
    <div class="avatar-zone">
      <div class="avatar-zone-header-avatar">
      </div>
      <h1 class="avatar-zone-header-name">Nguyentaninh</h1>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.setting-sidebar {
  position: relative;
  min-width: 240px;
  background-color: #fff;
  padding: 0 20px;
  flex: 0 0 320px;
  .avatar-zone {
    position: absolute;
    width: 50%;
    height: 50%;
    height: 200px;
    background-color: red;
    // top: -90px;
    left: 0;
    .avatar-zone-header-avatar {
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }
    // border-radius: 50%;
  }
}
</style>