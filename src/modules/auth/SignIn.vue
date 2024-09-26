<template>
  <div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="flex flex-1 items-center">
      <v-form
        ref="formEl"
        class="w-full"
        fast-fail
        @submit.prevent="onHandleLogin"
      >
        <template class="flex flex-col gap-y-4">
          <AppInput
            v-model="signInForm.username"
            :counter="10"
            :rules="[rules.name]"
            label="User name"
            placeHolder="Enter your username"
            required
          />
          <AppInput
            ref="passwordEl"
            v-model="signInForm.password"
            :rules="[rules.password]"
            label="Password"
            type="password"
            placeHolder="Enter your password"
            required
          />
          <app-button
            class="mt-2"
            color="#42B883"
            :loading="isLoadingSignIn"
            type="submit"
          >
            <span class="text-[#1D2125] font-bold">Continue</span>
          </app-button>
        </template>
      </v-form>
    </div>
    <div>
      <p class="mt-2 text-[0.75rem] text-center">Or continue with</p>
      <div class="w-full flex flex-col mt-2 gap-y-4">
        <app-button
          variant="outlined"
          v-for="(option, index) in oAuthOptions"
          :key="index"
          @click="option.event()"
        >
          <div class="flex justify-around gap-x-1">
            <v-icon size="20" color="#42B883" :icon="option.icon" />
            {{ option.title }}
          </div>
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '@/core/composables/useAuth';
import AppInput from '@/core/components/AppInput.vue';

const {
  signInForm,
  isLoadingSignIn,
  errorMessage,
  handleLogin,
} = useAuth();

const formEl = ref<HTMLFormElement | null>(null);

const onHandleLogin = async () => {
  if (formEl.value) {
    handleLogin().then(() => {
      formEl.value?.validate();
    });
  }
}

const rules = {
  name(value: string) {
    if (!value) {
      return 'Name is required!';
    }
    if (value) {
      return errorMessage.value === 'User is not exist!' ? errorMessage.value : true;
    }
  },
  password(value: string) {
    if (!value) {
      return 'Password is required!';
    }
    if (value) {
      return errorMessage.value === 'Password is not match!' ? errorMessage.value : true;
    }
  }
}

const oAuthOptions = [
  {
    title: 'Google',
    icon: 'custom:google',
    event: () => console.log('Google...'),
  },
];
</script>