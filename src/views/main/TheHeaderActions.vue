<template>
  <div class="flex flex-shrink-0 gap-x-2">
    <div v-for="item in headerActionIcons" :key="item.name">
      <v-tooltip :text="item.label" location="bottom">
        <template v-slot:activator="{ props }">
          <AppButton
            icon
            class="icon-actions"
            variant="text"
            size="28"
            @click="onClick(item)"
            v-bind="props"
          >
            <v-icon color="#42B883" :icon="`custom:${item.name}`" size="small" />
          </AppButton>
        </template>
      </v-tooltip>
    </div>
    <SettingsAvatar />
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
import { useRouter } from 'vue-router';
import SettingsAvatar from '@/views/settings/components/SettingsAvatar.vue';

const router = useRouter();
const headerActionIcons = [
  {
    name: 'notifications',
    path: '/notifications',
    label: 'Notifications',
  },
  {
    name: 'setting',
    path: '/setting',
    label: 'Setting',
  },
];

const onClick = (item: any) => {
  switch (item.name) {
  case 'notifications':
    console.log('notifications...');
    break;
  case 'setting':
    console.log('setting...');
    router.push({
      name: 'settings',
    });
    break;
    default:
      break;
  }
  console.log(item, 'item...');
};

const onClickAvatarMenu = () => {
  console.log('onClickAvatarMenu...');
}
</script>
<style lang="scss" scoped>
.icon-actions {
  &:hover {
    background-color: gray;
  }
}
</style>

