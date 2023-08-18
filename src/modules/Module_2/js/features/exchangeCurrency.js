import { subscribeCurrency } from "../api";

export function setNewExchangeValue(currency, value) {
    try {
        let selector = `#EXCHANGE_${currency.toUpperCase()}`;
        let currencyDisplay = document.querySelector(selector);
        currencyDisplay.innerHTML = value;
    } catch {
        console.error('Произошла ошибка в обновлении курса обмена');
    }
}

export function subscribeOnExchange() {
    const currencysArray = ['USD', 'CNY', 'CHF', 'EUR', 'JPY', 'TRY'];

    currencysArray.forEach((currency) => {
        subscribeCurrency(currency);
    })
}