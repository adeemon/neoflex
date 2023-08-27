export async function fetchNews() {
    const url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=24ee0a4156354c25a1b64f69483cf2f0';
    let req = await fetch(url);
    let result = await req.json();
    return result;
}

export async function fetchCurrency(currency: String) {
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
        let message = await result.text();
        let newValue = Number(message).toFixed(2);
        return newValue;

    } catch {
        console.error('Ошибка в получении данных с сервера обмена валют')
    }
}

export async function postCustom(path: string, body: string) {
    fetch(path, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
}
