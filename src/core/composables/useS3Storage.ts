
import { getUrl } from 'aws-amplify/storage';
import { useAuth } from './useAuth';

export const useS3Storage = () => {
  const { signInHandler } = useAuth();
  const download = async (key: string) => {
    // await signInHandler({});
    try {
      const res = await getUrl({
        path: key,
      });
      console.log(res, 'res...');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    download,
  };
};