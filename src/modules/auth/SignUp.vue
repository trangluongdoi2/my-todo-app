<template>
 <div class="w-full h-full p-8 flex flex-col justify-between">
    <div class="flex w-full h-full items-center">
      <v-form v-if="!isRegistered" class="w-full" v-model="valid">
        <template class="flex flex-col gap-y-4">
          <AppInput
            v-model="signUpForm.email"
            :rules="[rules.email]"
            label="Email"
            placeHolder="Enter your email"
            required
          />
          <AppInput
            v-model="signUpForm.username"
            :rules="[rules.name]"
            label="User name"
            placeHolder="Enter your username"
            required
          />
          <AppInput
            v-model="signUpForm.password"
            :rules="[rules.password]"
            label="Password"
            type="password"
            placeHolder="Enter your password"
            clearable
            required
          />
          <AppButton
            class="mt-2"
            color="#42B883"
            :loading="isLoadingSignUp"
            @click="onSignUp"
          >
            <span class="text-[#1D2125] font-bold">Continue</span>
          </AppButton>
        </template>
      </v-form>
      <template v-else>
        <div class="flex flex-1 items-center flex-col gap-y-2">
          <h1 class="text-center text-[#42B883]">Register Successfully!</h1>
          <v-icon icon="custom:done" color="#42B883" size="100"/>
          <!-- <AppButton color="#42B883" @click="backSignInPage">
            <span class="text-[#1D2125] font-bold">Sign In</span>
          </AppButton> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/core/components/AppButton.vue';
import AppInput from '@/core/components/AppInput.vue';
import { useAuth } from '@/core/composables/useAuth';

const {
  isRegistered,
  signUpForm,
  isLoadingSignUp,

  handleRegister,
} = useAuth();

const emit = defineEmits(['back-sign-in']);

const valid = ref<boolean>(false);

const rules = {
  email(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    return 'Must be a valid e-mail.'
  },
  name(value: string) {
    if (value) {
      return true;
    }
    return 'Name is required!';
  },
  password(value: string) {
    if (value) {
      return true;
    }
    return 'Password is required';
  },
}

const backSignInPage = () => {
  emit('back-sign-in');
}

const onSignUp = () => {
  handleRegister();
}

</script>
<style scoped lang="scss">
.app-icon {
  transform: scale(4);
  // > svg {
  //   width: 100px;
  //   height: 100px;
  // }
}
</style>