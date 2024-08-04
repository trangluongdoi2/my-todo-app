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