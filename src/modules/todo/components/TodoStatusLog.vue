<template>
  <div class="flex gap-x-2">
    <div class="user">
      <v-avatar class="account-image" size="32" :image="DEFAULT_AVATAR" />
    </div>
    <div class="flex flex-col gap-y-2">
      <div class="flex w-full gap-x-4">
        <span class="status-content">
          <strong>{{ currentUser.username }}</strong> {{ log.action }} {{ convertField(log.field) }} {{ time }}
        </span>
      </div>
      <div class="detail" v-if="log.action === 'update'">
        <v-chip color="#42B883" label class="h-[24px] w-fit">{{ log.oldValue || 'None'}}</v-chip>
        ->
        <v-chip color="#42B883" label class="w-fit">{{ log.newValue || 'None' }}</v-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DEFAULT_AVATAR } from '@/common/constants';
import { formatDateToDDMMYYWithDayjs } from '@/common/date';

const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
});
const currentUser = computed(() => props.log.user);
const time = computed(() => formatDateToDDMMYYWithDayjs(props.log.createdAt));

const convertField = (field: string) => {
  if (field === 'todoStatus') {
    return 'Status';
  }
  return field;
};

</script>
<style scoped lang="scss">
.v-chip {
  height: 24px;
  width: fit-content;
  padding: 0 8px;
  font-weight: 900;
  font-size: 11px;
}
</style>
