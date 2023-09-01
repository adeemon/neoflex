import * as React from 'react';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import exchangeLogo from '../../assets/images/content/exchange-logo.svg';
import { ExchangeNote } from '../exchangeNote/ExchangeNote';


const initialState = {
    USD: 60.78,
    CNY: 9.08,
    CHF: 64.78,
    EUR: 60.78,
    JPY: 0.46,
    TRY: 3.39,
};

export const Exchange: React.FC = () => {
    const [exchangeValues] = React.useState(new Map(Object.entries(initialState)));
    const valuesToRender = () => {
        let output = [];
        for (let [key, value] of exchangeValues.entries()) {
            output.push(
                <ExchangeNote currencyName={key} defaultValue={value} key={key} />,
            );
        }
        return output;
    };

    return (
        <section className="exchange">
            <h2 className="exchange__title">Exchange rate in internet bank</h2>
            <p className="exchange__currency">Currency</p>
            <ul className="exchange__rate-table">
                {valuesToRender()}
            </ul>
            <a href="/" target="_blank" className="exchange__all-courses"> All courses
            </a>
            <p className="exchange__update-desc">Update every 15 minutes, MSC 09.08.2022</p>
            <ImageFigured className="exchange__logo-container" alt="Typical bank image" src={exchangeLogo} />
        </section>
    );
};