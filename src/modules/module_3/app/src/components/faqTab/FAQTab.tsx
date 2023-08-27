import * as React from 'react';
import { Accorderon } from '../accordeon/Accordeon';

const issuingInfo = {
    'How to get a card?': 'We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg - 1-2 working days. For other regions of the Russian Federation - 2-5 working days.',
    'What documents are needed and how old should one be to get a card?':'Need a passport. You must be between 20 and 70 years old.',
    'In what currency can I issue a card?':'In rubles, dollars or euro',
    'How much income do I need to get a credit card?':'To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.',
    'How do I find out about the bank\'s decision on my application?':'After registration, you will receive an e-mail with a decision on your application.',
}

const usingInfo = {
    'What is an interest free credit card?': 'A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.',
    'How to activate a credit card': 'You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.',
    'What is a settlement date?': 'The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.',
    'What do I need to know about interest rates?': 'For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.',
}

const issuingInfoRender = Object.entries(issuingInfo).map((element, index)=> {
    return (
        <Accorderon summary={element[0]} content={element[1]} key={index} />
    )
})

const usingInfoRender = Object.entries(usingInfo).map((element, index)=> {
    return (
        <Accorderon summary={element[0]} content={element[1]} key={index} />
    )
})

export const FAQTab: React.FC = () => {
    return (
        <section className="faq">
            <p className="faq__title">Issuing and receiving a card</p>
            <div className="faq__accordions-container">
                {issuingInfoRender}
            </div>
            <p className="faq__title">Using a credit card</p>
            <div className="faq__accordions-container">
                {usingInfoRender}
            </div>
        </section>
    )
}