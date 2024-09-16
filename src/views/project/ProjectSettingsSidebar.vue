<template>
  <div class="w-[280px]">
    <v-list-item title="My Application" subtitle=""></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="General" @click.stop="$emit('select-tab', 'General')"></v-list-item>
    <v-list-item link title="Members" @click.stop="$emit('select-tab', 'Member')"></v-list-item>
  </div>
  <v-divider vertical />
</template>
<script setup lang="ts">
defineEmits(['select-tab']);
</script>