<template>
  <app-modal v-model:visible="visible" width="50%">
   <div>Are you sure delete this item?</div>
   <template v-slot:actions>
      <div class="flex items-center justify-end gap-x-2">
       <v-btn variant="text" @click="visible = false">
         Cancel
       </v-btn>
       <app-button :loading="loading" color="#42B883" @click="$emit('ok')">
          Delete
       </app-button>
     </div>
   </template>
  </app-modal>
</template>

<script setup lang="ts">
const visible = defineModel({ type: Boolean, default: false });
defineProps({
 loading: {
   type: Boolean,
   default: false,
 }
});
defineEmits(['ok']);
</script>