<template>
  <div class="flex gap-x-2">
    <div class="user">
      <v-avatar class="account-image" size="32" :image="DEFAULT_AVATAR" />
    </div>
    <div class="w-full flex gap-y-2 justify-between">
      <div class="w-full">
        <span class="status-content">
          <strong>{{ currentUser.username }}</strong> {{ log.action }}
          <i class="font-bold">
            {{ convertField(log.field) }}
          </i>
        </span>
        <div class="detail" v-if="log.field === 'todoStatus'">
          <v-chip color="#42B883" label class="h-[24px] w-fit">{{ log.oldValue || 'None'}}</v-chip>
          <span class="mx-2">-></span>
          <v-chip color="#42B883" label class="w-fit">{{ log.newValue || 'None' }}</v-chip>
        </div>
        <div class="detail" v-if="log.field === 'comment'">
          <span class="text-sm">{{ log.oldValue || 'None' }}</span>
          <span class="mx-2">-></span>
          <span class="text-sm">{{ log.newValue || 'None' }}</span>
        </div>
      </div>
    </div>
    <h2 class="min-w-fit history-time">{{ time }}</h2>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
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
  if (field === 'comment') {
    return 'Comment';
  }
  return field;
};

onMounted(() => {
  // console.log(props.log, '==> log...');
});

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
