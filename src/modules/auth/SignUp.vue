<template>
 <div class="w-full h-full pl-4 pr-4 pt-8 pb-8 flex flex-col justify-between">
    <div class="flex w-full h-full items-center">
      <v-form v-if="currentStep === 1" class="w-full" v-model="valid">
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
      <template v-else-if="currentStep === 2">
        <div class="flex flex-col flex-1 gap-y-2">
          <v-otp-input :length="6" v-model="confirmOTP"/>
          <p>The OTP code will be invalid in {{ validTime }} seconds</p>
          <AppButton
            color="#42B883"
            :loading="isLoadingConfirmSignUp"
            @click="onConfirmOTP"
          >
           <span class="text-[#1D2125] font-bold">Confirm</span>
          </AppButton>
          <AppButton
            color="#FD9891"
            @click="backSignUpPage"
          >
            <span class="text-[#ffffff] font-bold">Go Back</span>
          </AppButton>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-1 flex-col gap-y-2">
          <h2 class="text-center">Register Successfully!</h2>
          <AppButton color="#42B883" @click="backSignInPage">
            <span class="text-[#1D2125] font-bold">Sign In</span>
          </AppButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AppButton from '@/core/components/AppButton.vue';
import AppInput from '@/core/components/AppInput.vue';
import { useAuth } from '@/core/composables/useAuth';

const {
  signUpForm,
  isLoadingSignUp,
  isLoadingConfirmSignUp,
  confirmOTP,
  currentAuthMode,

  confirmOTPHandler,
  signUpHandler,
  resetSignUpForm,
} = useAuth();

const emit = defineEmits(['back-sign-in']);

let countDownConfirmOTP: any;
const VALID_TIME = 120;
const valid = ref<boolean>(false);
const currentStep = ref<number>(1);
const validTime = ref<number>(VALID_TIME);

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
const onSignUp = () => {
  signUpHandler().then(() => {
    currentStep.value = 2;
  })
}

const backSignUpPage = () => {
  currentStep.value = 1;
}

const backSignInPage = () => {
  emit('back-sign-in');
  currentStep.value = 1;
  resetValidConfirmOTPTime();
}

const resetValidConfirmOTPTime = () => {
  clearInterval(countDownConfirmOTP);
  validTime.value = VALID_TIME;
}

const onConfirmOTP = () => {
  confirmOTPHandler().then(() => {
    currentStep.value = 3;
  })
}

watch(currentStep, () => {
  if (currentStep.value === 2) {
    countDownConfirmOTP = setInterval(() => {
      validTime.value -=1;
    }, 1000);
    return;
  }
  resetValidConfirmOTPTime();
});

watch(currentAuthMode, () => {
  if (currentAuthMode.value === 'sign-in') {
    currentStep.value = 1;
    resetValidConfirmOTPTime();
    resetSignUpForm();
  }
}, { immediate: true });

watch(signUpForm, () => {
  console.log(signUpForm.value, 'signUpForm...');
})

</script>

<style scoped lang="scss">

</style>