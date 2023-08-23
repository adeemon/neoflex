import * as React from 'react';
import { AboutCardTab } from '../aboutCardTab/AboutCardTab';
import { RatesConditionsTab } from '../ratesConditionsTab/RatesConditionsTab';
import { CashbackTab } from '../cashbackTab/CashbackTab';
import { FAQTab } from '../faqTab/FAQTab';

const tabs = {
    'About card': <AboutCardTab />,
    'Rates and conditions': <RatesConditionsTab />,
    'Cashback': <CashbackTab />,
    'FAQ': <FAQTab />
}

const tabsMap = new Map(Object.entries(tabs))

const tabsList = new Array(Object.keys(tabs));

export const TabsManager: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('About card');

    const onCLickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const clickedTab =  e.currentTarget.textContent || 'About card' ;
        console.log(clickedTab);
        setActiveTab(clickedTab)
    }

    React.useEffect(()=> {
        console.log('rerender');
    }, [activeTab])

    return (
        <section className="tabs-manager">
            <div className="tabs-manager__tabs-container">
                <button className={`tabs-manager__tab${activeTab==='About card' ? '-active' : ''}`} 
                    onClick={onCLickHandler}>About card</button>
                <button className={`tabs-manager__tab${activeTab==='Rates and conditions' ? '-active' : ''}`} 
                    onClick={onCLickHandler}>Rates and conditions</button>
                <button className={`tabs-manager__tab${activeTab==='Cashback' ? '-active' : ''}`} 
                    onClick={onCLickHandler}>Cashback</button>
                <button className={`tabs-manager__tab${activeTab==='FAQ' ? '-active' : ''}`} 
                    onClick={onCLickHandler}>FAQ</button>
                <div className="tabs-manager__spacer"></div>
            </div>
            <div className="tabs-manager__content">
                {tabsMap.get(activeTab)}
            </div>
        </section>
    )
}