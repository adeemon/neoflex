import { parse } from 'date-fns';
import { IloanOffer } from '../interfaces';
import * as Randomstring from 'randomstring';

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

export function parseDateTimeString(value: string, originalValue: string | Date) {
  return originalValue instanceof Date
    ? originalValue
    : parse(originalValue, 'dd.LL.yyyy hh:mm:ss', new Date());
}


export const getApllicationListFromString = (applicationsString: string) => {
  const splited = applicationsString.split(',');
  const numbered = splited.map((element) =>
    Number.parseInt(element, 10));
  return numbered;
};

export const compareTwoLoanOffers = (firstOffer: IloanOffer, secondOffer: IloanOffer) => {
  const firstOverget = firstOffer.totalAmount - firstOffer.requestedAmount;
  const secondOverget = secondOffer.totalAmount - secondOffer.requestedAmount;
  const firstTotalPayed = firstOffer.term * firstOffer.monthlyPayment;
  const secondTotalPayed = secondOffer.term * secondOffer.monthlyPayment;
  const firstOverpay = firstTotalPayed - firstOverget - firstOffer.totalAmount;
  const secondOverpay = secondTotalPayed - secondOverget - secondOffer.totalAmount;
  return firstOverpay - secondOverpay;
};

export const insertSpaceBeforeUpperLetter = (inputString: string) => {
  let indexOfFirstUpper = inputString.search(/[A-Z]/);
  if (indexOfFirstUpper === -1) {
    return inputString;
  }
  return `${inputString.slice(0, indexOfFirstUpper)} ${inputString.slice(indexOfFirstUpper)}`;
};

export const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomString = (length: number) => {
  return Randomstring.generate(length);
}