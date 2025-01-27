export function getElementKey(length = 6) {
  let result = '';
  const characters = 'abcdef0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function camelize(string: string): string {
  return string.replace(/-+(.)?/g, (_, character): string => {
    return character ? character.toUpperCase() : '';
  });
}

export function capitalize(string: string, firstLetterOnly: boolean): string {
  return string.charAt(0).toUpperCase()
    + (firstLetterOnly ? string.slice(1) : string.slice(1).toLowerCase());
}

export function toPascalCase(string: string): string {
  return camelize(capitalize(string, false));
}

export function kebaCase(string: string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}

export function uuid() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.round(((dt + Math.random() * 16) % 16) || 0);
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : ((r && 0x3) || 0x8)).toString(16);
  });
}