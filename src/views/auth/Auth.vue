<template>
  <div class="wrapper-container w-full h-full flex flex-col items-center justify-center">
    <h1 class="mb-4 greeting title title--none-border">TODO APP</h1>
    <div ref="authContainerRef" class="container flex items-center justify-center">
			<div class="form-container sign-up-container">
				<SignUp @back-sign-in="switchAuthMode('sign-in')"/>
			</div>
      <div class="form-container sign-in-container">
				<SignIn />
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h2>Welcome Back!</h2>
            <p>To keep connected with us please login with your personal info</p>
            <AppButton
              color="#42B883"
              @click="switchAuthMode('sign-in')">
              <span class="chevron mr-4 text-[#1D2125] font-bold"><-&nbsp</span>
              <span class="text-[#1D2125] font-bold">Sign In</span>
            </AppButton>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start journey with us</p>
            <AppButton
              color="#42B883"
              @click="switchAuthMode('sign-up')"
            >
              <span class="text-[#1D2125] font-bold">Sign Up</span>
              <span class="chevron text-[#1D2125] font-bold">&nbsp-></span>
            </AppButton>
          </div>
        </div>
      </div>
    </div>
		<p class="text-white m-4">Or</p>
		<AppButton color="#42B883" class="h-10" @click="() => {}">
			<span class="text-dark-blue font-bold">
				Continue as Guest
			</span>
		</AppButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import AppButton from '@/core/components/AppButton.vue';
import SignIn from '@/modules/auth/SignIn.vue';
import SignUp from '@/modules/auth/SignUp.vue';

const authContainerRef = ref<HTMLElement>();

const switchAuthMode = (mode: string) => {
  if (mode === 'sign-up') {
    authContainerRef.value?.classList.add('right-panel-active');
  } else {
    authContainerRef.value?.classList.remove('right-panel-active');
  }
};

const onConfirmCodeSignIn = () => {
  console.log('onConfirmCodeSignIn...');
};

const onFinishFailed = () => {
  console.log('onFinishFailed');
};

onMounted(async () => {
	// const user = await getCurrentUser();
});
</script>
<style lang="scss" scoped>
h2, p {
  color: $text;
}
.container {
	border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
			0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
	opacity: 0;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
	.chevron {
		width: 10px;
		// @include slide-horizontal-animation;
	}
}

.container.right-panel-active .overlay-container {
	transform: translateX(-100%);
}

.overlay {
	background-color: $surface-suken;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #FFFFFF;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}
</style>
