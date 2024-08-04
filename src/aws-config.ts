import { Amplify, ResourcesConfig } from 'aws-amplify';
import awsconfig from '@/aws-exports';

export type AccessLevel = 'guest' | 'protected' | 'private';

export const configureAmplify = awsconfig.configureAmplify as ResourcesConfig;

export const amplifyConfigure = () => {
  const libraryOptions: any = {
    Storage: {
      S3: {
        prefixResolver: async (input: { accessLevel: AccessLevel, targetIdentityId: string}) => {
          console.log(input, 'accessLevel, targetIdentityId...');
          let { targetIdentityId } = input;
          if (input.accessLevel === 'guest') {
            targetIdentityId = input.accessLevel;
          }
          return `${targetIdentityId}/`;
        },
      },
    },
  }; 
  console.log(configureAmplify, libraryOptions, 'configureAmplify, libraryOptions...');
  Amplify.configure(configureAmplify, libraryOptions);
};
