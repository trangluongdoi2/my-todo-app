<template>
   <AppModal v-model:visible="visible" width="50%">
    <div>Are you sure delete this item?</div>
    <template v-slot:actions>
       <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
        <v-btn variant="text" @click="visible = false">
          Cancel
        </v-btn>
        <v-btn :loading="loading" color="#42B883" @click="$emit('ok')">
          Delete
        </v-btn>
      </div>
    </template>
   </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/core/components/AppModal.vue';
const visible = defineModel({ type: Boolean, default: false });
defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
});
defineEmits(['ok']);
</script>

<style lang="scss" scoped>

</style>