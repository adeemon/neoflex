import { parse } from 'date-fns';


export function flilterText(inputText: string) {
  const hashtagsRegex = /#[^\s]{1,}\s'/;
  return inputText ? inputText.replace(hashtagsRegex, '') : '';
}

export function writeCookie(key: string, value: string, lifeTime: number) {
  const date = new Date();
  date.setDate(date.getDate() + lifeTime);
  document.cookie = `${key}=${value}; path=/; expires="${date.toUTCString()}`;
}

export function readCookie(key: string) {
  const regExPart = key.replace(/([.$?*|{}()[]\/+^])/g, '\\$1');
  const matches = document.cookie.match(new RegExp(`(?:^|; )${regExPart}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function parseDateString(value: string, originalValue: string | Date) {
  return originalValue instanceof Date
    ? originalValue
    : parse(originalValue, 'dd.MM.yyyy', new Date());
}


export const getApllicationListFromString = (applicationsString: string) => {
  const splited = applicationsString.split(',');
  const numbered = splited.map((element) =>
    Number.parseInt(element, 10));
  return numbered;
};
