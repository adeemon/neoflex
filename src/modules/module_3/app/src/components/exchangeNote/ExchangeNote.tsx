import * as React from 'react';
import { useState } from 'react';


export interface IExchangeNoteProps {
    currencyName: String,
    defaultValue: Number
}

export const ExchangeNote: React.FC<IExchangeNoteProps> = ({currencyName, defaultValue}) => {

    const [exchangeValue, setExchanheValue] = useState(defaultValue);

    React.useEffect(() => {
        async function subscribeCurrency() {
            const fetchUrl = `https://currency-exchange.p.rapidapi.com/exchange?from=${currencyName}&to=RUB&q=1.0`;
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
                    await subscribeCurrency();
                } else if (result.status != 200) {
                    await new Promise(resolve => setTimeout(resolve, 100000));
                    await subscribeCurrency();
                } else {
                    let message = await result.text();
                    let newValue = Number(message).toFixed(2);
                    setExchanheValue(Number(newValue));
                    await new Promise(resolve => setTimeout(resolve, 900000));
                    await subscribeCurrency();
                }
            } catch {
                console.error('Ошибка в получении данных с сервера обмена валют');
            }
        }
        subscribeCurrency();
    })

    return (
        <li className="exchange__rate">
            <span className="exchange__currency-title">{currencyName}:</span>
            <span className="exchange__currency-value" id="EXCHANGE_USD">{'' + exchangeValue}</span>
        </li>
    )
}