import * as React from 'react';

const info = {
    'Card currency': 'Rubles, dollars, euro',
    'Interest free period': '0% up to 160 days',
    'Payment system': 'Mastercard, Visa',
    'Maximum credit limit on the card': '600 000 ₽',
    'Replenishment and withdrawal': 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
    'Max cashback per month': 'Max cashback per month',
    'Transaction Alert': ['60 ₽ — SMS or push notifications', '0 ₽ — card statement, information about transactions in the online bank']
}



const infoToRender = Object.entries(info).map((infoNote) => {
    const rate = infoNote[0];
    let condition = infoNote[1];
    let jsxCondition;
    if (Array.isArray(condition)) {
        jsxCondition = condition.map((element) => {
            return ((
                <p className='rates-conditions__condition'>{element}</p>
            ))
        })
    } else {
        jsxCondition = (
            <p className='rates-conditions__condition'>{condition}</p>
        )
    }
    return (
        <div className="rates-conditions__note">
            <p className="rates-conditions__rate">
                {rate}
            </p>
            <div className="rates-conditions__conditions-container">
                {jsxCondition}
            </div>
        </div>
    )
})

export const RatesConditionsTab: React.FC = () => {
    
    return (
        <section className="rates-conditions">
            {infoToRender}
        </section>
    );
}