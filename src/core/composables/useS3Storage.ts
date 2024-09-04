
import { getUrl } from 'aws-amplify/storage';

export const useS3Storage = () => {
  const download = async (key: string) => {
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