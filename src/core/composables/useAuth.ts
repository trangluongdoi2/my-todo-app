import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {
  autoSignIn,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";

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
}

const defaultSignUpForm: SignUpForm = {
  username: '',
  password: '',
  email: '',
}

type AuthMode = 'sign-in' | 'sing-out';

export const useAuth = () => {
  const router = useRouter();
  const isLoadingSignUp = ref<boolean>(false);
  const isLoadingSignIn = ref<boolean>(false);
  const isLoadingSignInAsGuest = ref<boolean>(false);
  const isLoadingConfirmSignUp = ref<boolean>(false);
  const currentUserName = ref<string>();
  const confirmOTP = ref<any>();
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

  
  const signInHandler = async () => {
    const currentInput = { ...signInForm.value };
    isLoadingSignIn.value = true;
    try {
      await signIn(currentInput);
      // const user = await getCurrentUser();
      // const authState = await fetchAuthSession({ forceRefresh: true });
      router.push({ name: 'dashboard' });
    } catch (error) {
      console.log(error?.message, 'error?.message..');
      signInForm.value.password = 'Incorrect username or password';
      signInForm.value.username = 'Incorrect username or password';
    } finally {
      isLoadingSignIn.value = false;
    }
  };

  const confirmOTPHandler = async () => {
    isLoadingConfirmSignUp.value = true;
    try {
      await confirmSignUp({
        username: currentUserName.value || '',
        confirmationCode: confirmOTP.value || '',
      });
    } catch (error) {
      console.log(error, 'error..');
      errorConfirmOTP.value = error.message;
      // resendSignUpCode({
      //   username: currentUserName.value || '',
      // }).then(() => {
      //   console.log('Code resent successfully!');
      // }).finally(() => {
      //   isLoadingConfirmSignUp.value = false;
      // });
    }
  };
  
  const signUpHandler = async () => {
    const currentInput = { ...signUpForm.value };
    isLoadingSignUp.value = true;
    try {
      await signUp({
        username: currentInput.username,
        password: currentInput.password,
        options: {
          userAttributes: {
            email: currentInput.email
          }
        }
      });
      currentUserName.value = currentInput.username;
    } catch (error) {
      throw Error(error);
    } finally {
      isLoadingSignUp.value = false;
    }
  };

  const signOutHandler = async () => {
    try {
      signOut().then(() => {
        window.location.href='/auth';
      });
    } catch (error) {
      console.error(error);
    }
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
    
    resetSignInForm,
    resetSignUpForm,
    signInHandler,
    signUpHandler,
    signOutHandler,
    confirmOTPHandler,
  };
};