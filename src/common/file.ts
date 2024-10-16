export function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

export function saveArrayToFile(base64: string, fileName: any) {
  const extension = getExtensionFile(fileName);
  const arrayBytes = base64ToArrayBuffer(base64);
  const blob = new Blob([arrayBytes], { type: `image/${extension}` });
  const link = document.createElement("a");
  const blobUrl = URL.createObjectURL(blob);
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function getExtensionFile(fileName: string = '') {
  return (fileName.split('.').pop()) ?? '';
}

export function getFileNameWithoutExtension(fileName: string = '') {
  const [nameWithoutExtension] = fileName.split(/(?=\.[^.]+$)/);
  return nameWithoutExtension ?? '';
}

export function isVideoFile(file: File) {
  return file.type.includes('video');
}

export function isImageFile(file: File) {
  return file.type.includes('image');
}

export function getVideoThumbnail(file: File) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    video.src = URL.createObjectURL(file);
    video.preload = 'metadata';
    video.load();

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 1;
    };

    video.onseeked = () => {
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/png');
        resolve(thumbnail);
        URL.revokeObjectURL(thumbnail);
      } else {
        reject(new Error('Failed to get video thumbnail'));
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to get video thumbnail'));
    };
  });
}
