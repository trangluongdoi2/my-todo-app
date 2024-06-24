<template>
  <v-btn v-bind="{...$attrs}" >
    <slot />
    <template v-slot:prepend>
      <slot name="prepend" />
    </template>
    <template v-slot:append>
      <slot name="append" />
    </template>
  </v-btn>
</template>
<script setup lang="ts">

</script>
