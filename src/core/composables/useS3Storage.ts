
import { getUrl } from 'aws-amplify/storage';

export const useS3Storage = () => {
  const download = async (key: string) => {
    const res = await getUrl({
      path: key,
      // options: {

      // }
    });
    console.log(res, 'res...');
  };

  return {
    download,
  }
}