import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthApi from "@/modules/auth/api/authApi";
// import

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

  const handleLogin = async () => {
    console.log('handleLogin...');
    isLoadingSignIn.value = false;
    const { data, status, message = '' } = await AuthApi.login(signInForm.value);
    if (status.toString().startsWith('4') || status.toString().startsWith('5')) {
      errorMessage.value = message;
    } else {
      errorMessage.value = '';
    }
    console.log(data, status, errorMessage.value, 'data, status, errorMessage.value...');
  };

  const handleRegister = () => {
    console.log('register...');
  };

  const handleLogout = () => {
    console.log('handleLogout...');
  }

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
  };
};
