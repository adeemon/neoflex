import axios from 'axios';
import { setNewExchangeValue } from '../features/exchangeCurrency';

//Данная функция должна выполнять доп таску, но добиться от неё реакции на несколько
//входных сорсов я так и не смог
export async function testParseSomeCurrAtOnce() {
    const options = {
        method: 'GET',
        url: 'https://currency-exchange.p.rapidapi.com/exchange',
        params: {
            from: ['EUR', 'USD'],
            to: ['RUB', 'RUB'],
            q: 4
        },
        headers: {
            'X-RapidAPI-Key': '83343411bamsh20e96942442fe55p12dda9jsnb29f2c91d316',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
    } catch (error) {
        console.error(error);
    }
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
        if (result.status == 502) {
            await subscribeCurrency(currency);
        } else if (result.status != 200) {
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

export async function fetchNews() {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=24ee0a4156354c25a1b64f69483cf2f0';
    let req = await fetch(url);
    let result = await req.json();
    return result;
}