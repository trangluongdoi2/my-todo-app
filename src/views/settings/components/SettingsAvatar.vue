<template>
  <div class="settings-container max-w-[300px]">
    <v-menu>
      <template v-slot:activator="{ props }">
        <AppButton
          icon
          size="28"
          @click="onClickAvatarMenu()"
          v-bind="props"
        >
          <v-avatar size="28" :image="AvatarUrl" />
        </AppButton>
      </template>
      <div class="account flex p-4">
        <v-avatar class="account-image" size="32" :image="AvatarUrl" />
        <div class="account-info">
          <div class="account-name">{{ name }}</div>
          <div class="account-email">{{ email }}</div>
        </div>
      </div>
      <div>
        <v-list class="settings-list">
          <v-list-item v-for="(option, i) in settingOptions" :key="i" :value="option">
            <div v-if="option?.children?.length">
              <v-menu class="themes-list" location="start">
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="w-full min-h-[100] flex items-center justify-between gap-x-4">
                    {{ option.name }}
                    <v-icon size="16" icon="mdi-arrow-right" />
                  </div>
                </template>
                <v-list>
                  <v-list-item v-for="childOption in option.children" :key="childOption.name" @click="childOption.event()">
                    <div class="w-full flex justify-between items-center gap-4">
                      <v-img :width="100" :max-width="100" :height="100" :src="childOption.img" />
                      <span>{{ childOption.name }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div v-else @click.stop="option.event()">{{ option.name }}</div>
          </v-list-item>
        </v-list>
      </div>
      <div class="logout pl-4 pb-4 pr-1">
        Logout
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import AppButton from '@/core/components/AppButton.vue';
import { useRouter } from 'vue-router';
import DarkTheme from '@/assets/dark_theme.png';
import LightTheme from '@/assets/light_theme.png';
import BrowerTheme from '@/assets/browser_theme.png';

const router = useRouter();
const name = 'Nguyen Tan Vinh';
const email = 'vinhnguyentan99@gmail.com';

const onClickAvatarMenu = () => {
  console.log('onClickAvatarMenu...');
};

const changeTheme = (theme: string) => {
  console.log(theme, 'changeTheme...');
}

const settingOptions = [
  {
    name: 'Profile',
    event: () => {
      router.push({ name: 'profile' });
    }
  },
  {
    name: 'Personal Settings',
    event: () => {
      router.push({ name: 'settings' });
    }
  },
  {
    name: 'Theme',
    children: [
      {
        name: 'Dark',
        img: DarkTheme,
        event: () => changeTheme('dark')
      },
      {
        name: 'Light',
        img: LightTheme,
        event: () => changeTheme('dark')
      },
      {
        name: 'System',
        img: BrowerTheme,
        event: () => changeTheme('system')
        
      }
    ]
  }
];

const navigateSettingTabs = (tab: string) => {
  console.log(tab, 'tab...');
}
</script>
<style lang="scss" scoped>
.account {
  display: flex;
  align-items: center;
  color: $text-accent-gray;
  .account-image {
    margin-right: 8px;
  }
  .account-info {
    .account-name {
      font-size: 14px;
      line-height: 20px;
    }
    .account-email {
      font-size: 12px;
    }
  }
}
.settings-list, .logout{
  color: $text-accent-gray;
  font-size: 16px;
  font-weight: bold;
}
.theme-list {
  :deep(.v-overlay > .v-overlay__content) {
  background-color: #2c2e34;
  }
} 
</style>

