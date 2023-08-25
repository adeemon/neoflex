import { Accorderon } from "../components/accordeon/Accordeon";
import { parse } from "date-fns";

export function flilterText(inputText: string) {
    const hashtagsRegex = new RegExp('#[^\s]{1,}\s');
    return inputText ? inputText.replace(hashtagsRegex, '') : '';
}

export function writeCookie(key: string, value: string, lifeTime: number) {
    let date = new Date;
    date.setDate(date.getDate() + lifeTime);
    document.cookie = key+"="+value+"; path=/; expires=" + date.toUTCString();
}

export function readCookie(key: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function parseDateString(value: string, originalValue: string | Date) {
    return originalValue instanceof Date
      ? originalValue  // this make sure that a value is provided
      : parse(originalValue, "dd.MM.yyyy", new Date());
  }