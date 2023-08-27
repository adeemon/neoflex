import * as React from 'react';
import { InfoCardTitleDesc } from '../infoCardTitleDesc/InfoCardTitleDesc';

const info = {
    'For food delivery, cafes and restaurants': '5%',
    'In supermarkets with our subscription': '5%',
    'In clothing stores and children\'s goods': '2%',
    'Other purchases and payment of services and fines': '1%',
    'Shopping in online stores': 'up to 3%',
    'Purchases from our partners': '30%'
}

const infoToRender = Object.entries(info).map((element, index) => {
    const name = element[0];
    const value = element[1];
    const isOdd: boolean = index % 2 == 1 ? true : false;
    return (
        <InfoCardTitleDesc className='cashback-tab__card' title={value} description={name} isOdd={isOdd} key={index} />
    )

})

export const CashbackTab: React.FC = () => {
    return (
        <section className="cashback-tab">
            {infoToRender}
        </section>
    )
}