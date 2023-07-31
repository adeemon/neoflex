import { setNewExchangeValue } from "../utils";

export function temp() {
    subscribeCurrency('EUR')
}

export async function subscribeCurrency(currency) {
    const fetchUrl = `https://currency-exchange.p.rapidapi.com/exchange?from=${currency}&to=RUB&q=1.0`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '83343411bamsh20e96942442fe55p12dda9jsnb29f2c91d316',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };
    try {
        let result = await fetch(fetchUrl, options);
        console.log(fetchUrl);
        if (result.status == 502) {
            await subscribeCurrency(currency);
        } else if (result.status != 200) {
            console.log('New status ' + result.statusText);
            await new Promise(resolve => setTimeout(resolve, 100000));
            await subscribeCurrency(currency);
        } else {
            let message = await result.text();
            let newValue = Number(message).toFixed(2);
            setNewExchangeValue(currency, newValue);
            await new Promise(resolve => setTimeout(resolve, 900000));
            await subscribeCurrency(currency);
        }
    } catch {
        console.error('Ошибка в получении данных с сервера обмена валют');
    }
}