import { Amplify } from 'aws-amplify';
import awsconfig from '@/aws-exports';

export const amplifyConfigure = () => {
  Amplify.configure({
    ...awsconfig,
    Storage: {
      S3: {
        bucket: 's3-todo-uploads',
        region: 'ap-southeast-1',
      }
    }
  }
  );
};

export default awsconfig;
