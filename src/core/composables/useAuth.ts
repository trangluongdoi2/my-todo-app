import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthApi from "@/modules/auth/api/authApi";
import { useGlobalStates } from "@/core/composables/useGlobalStates";
import { useLocalStorage } from "@/core/composables/useLocalStorage";

type AuthMode = 'sign-in' | 'sign-out';
interface SignInForm {
  username: string;
  password: string;
}

interface SignUpForm {
  username: string;
  password: string;
  email: string;
}

const defaultSignInForm: SignInForm = {
  username: '',
  password: '',
};

const defaultSignUpForm: SignUpForm = {
  username: '',
  password: '',
  email: '',
};

const errorMessagesMap = {
  401: 'Error',
  402: 'Error',
  403: 'Error',
  404: 'Error',
};

export const useAuth = () => {
  const router = useRouter();
  const { storage: authLocalStorage } = useLocalStorage();
  const isLoadingSignUp = ref<boolean>(false);
  const isLoadingSignIn = ref<boolean>(false);
  const isLoadingSignInAsGuest = ref<boolean>(false);
  const isLoadingConfirmSignUp = ref<boolean>(false);
  const currentUserName = ref<string>();
  const confirmOTP = ref<any>();
  const errorMessage = ref<string>();
  const currentAuthMode = ref<AuthMode>('sign-in');
  const signInForm = ref<SignInForm>(defaultSignInForm);
  const signUpForm = ref<SignUpForm>(defaultSignUpForm);
  const errorConfirmOTP = ref<string>('');

  const resetSignInForm = () => {
    signInForm.value = { ...defaultSignInForm };
  };

  const resetSignUpForm = () => {
    signUpForm.value = { ...defaultSignUpForm };
  };

  const setCacheUser = (data: any) => {
    const { accessToken = '', refreshToken = '' } = data;
    delete data?.accessToken;
    delete data?.refreshToken;
    authLocalStorage.setItem('auth', 'user', data);
    authLocalStorage.setItem('auth', 'accessToken', accessToken);
    authLocalStorage.setItem('auth', 'refreshToken', refreshToken);
    isLoadingSignIn.value = false;
  };

  const removeCacheUser = async () => {
    await Promise.all([
      authLocalStorage.removeItem('auth', 'user'),
      authLocalStorage.removeItem('auth', 'accessToken'),
      authLocalStorage.removeItem('auth', 'refreshToken'),
    ]);
  };

  const handleLogin = async () => {
    isLoadingSignIn.value = true;
    const { data, status, message = '' } = await AuthApi.login(signInForm.value);
    if (status.toString().startsWith('4') || status.toString().startsWith('5')) {
      errorMessage.value = message;
    } else {
      errorMessage.value = '';
    }
    if (!data) {
      isLoadingSignIn.value = false;
      return;
    }
    setCacheUser(data);
    isLoadingSignIn.value = false;
    router.push({ name: 'dashboard' });
  };

  const handleRegister = () => {
    console.log('register...');
  };

  const handleLogout = () => {
    // console.log('handleLogout...');
    removeCacheUser();
    window.location.href='/auth';
  };

  return {
    currentAuthMode,
    signInForm,
    signUpForm,
    isLoadingSignIn,
    isLoadingSignUp,
    isLoadingConfirmSignUp,
    confirmOTP,
    errorConfirmOTP,
    errorMessage,
    
    resetSignInForm,
    resetSignUpForm,
    handleLogin,
    handleRegister,
    handleLogout,
    removeCacheUser,
  };
};
