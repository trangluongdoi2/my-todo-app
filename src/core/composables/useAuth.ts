import { autoSignIn, confirmSignUp, getCurrentUser, signIn, signOut, signUp } from "aws-amplify/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const router = useRouter();
  const isLoadingSignUp = ref<boolean>(false);
  const isLoadingSignIn = ref<boolean>(false);
  const isLoadingSignInAsGuest = ref<boolean>(false);
  const isLoadingConfirmSignUp = ref<boolean>(false);
  const currentUserName = ref<string>();
  const currentStep = ref<number>(1);
  
  const signInHandler = async (input: any) => {
    const newInput = {
      username: 'admin',
      password: 'Vinhnguyen123@',
    };
    isLoadingSignIn.value = true;
    try {
      // await signIn({ ...input });
      await signIn(newInput);
      const { userId, username, signInDetails } = await getCurrentUser();
      console.log(userId, username, signInDetails, 'userId, username, signInDetails...');
      // authStore.setCurrentUser({
      //   userId,
      //   username,
      //   role: signInDetails?.loginId === 'admin' ? UserRole.ADMIN : UserRole.GUEST,
      // });
    } catch (error) {
      // console.log('error signing in', error);
      console.error(error);
      await signOut();
    } finally {
      // isLoadingSignIn.value = false;
      // router.push({ name: 'home' });
    }
  };

  const handleSignUpConfirmation = async () => {
    isLoadingConfirmSignUp.value = true;
    try {
      // await confirmSignUp({
      //   username: currentUserName.value || '',
      //   confirmationCode: formSignUpConfirmCodeState.confirmCode || '',
      // });
      currentStep.value = 3;
    } catch (error) {
      console.log('error confirming sign up', error);
      // resendSignUpCode({
      //   username: currentUserName.value || '',
      // }).then(() => {
      //   console.log('Code resent successfully!');
      // })
      //   .finally(() => {
      //     isLoadingConfirmSignUp.value = false;
      //   });
    }
  };
  
  const signUpHandler = async (input: any) => {
    isLoadingSignUp.value = true;
    try {
      await signUp({
        username: input.username,
        password: input.password,
        options: {
          userAttributes: {
            email: input.email
          }
        }
      });
      currentUserName.value = input.username;
      currentStep.value = 2;
    } catch (error) {
      console.log('error sign up', error);
    } finally {
      isLoadingSignUp.value = false;
    }
  };

  const signOutHandler = async () => {
    try {
      signOut().then(() => {
        // authStore.destroy();
        window.location.href='/auth/login';
      });
    } catch (error) {
      console.error(error);
    }
  };

  const autoSignInHandler = async () => {
    try {
      const signInOutput = await autoSignIn();
      console.log(signInOutput, 'object');
    } catch (error) {
      // console.log('autoSignInHandler..');
      console.error('Heehe');
    }
    
  };

  async function signInAsGuest() {
    console.log('signInAsGuest...');
  }

  return {
    signInHandler,
  };
};