import * as React from 'react';
import { AboutCardTab } from '../aboutCardTab/AboutCardTab';
import { RatesConditionsTab } from '../ratesConditionsTab/RatesConditionsTab';
import { CashbackTab } from '../cashbackTab/CashbackTab';
import { FAQTab } from '../faqTab/FAQTab';

export interface ITabsPair {
    name: string,
    component: JSX.Element,
}

export interface ITabsManagerProps {
    tabsArray: Array<ITabsPair>
}
export const TabsManager: React.FC<ITabsManagerProps> = ({tabsArray}) => {
    const [activeTab, setActiveTab] = React.useState('About card');

    const onCLickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const clickedTab =  e.currentTarget.textContent || 'About card' ;
        console.log(clickedTab);
        setActiveTab(clickedTab)
    }

    const tabsToRender = tabsArray.map((note) => {
        return (
            <button className={`tabs-manager__tab${activeTab===note.name ? '-active' : ''}`} 
                    onClick={onCLickHandler} key={note.name}>{note.name}</button>
        )
    })

    React.useEffect(()=> {
        console.log('rerender');
    }, [activeTab])

    return (
        <section className="tabs-manager">
            <div className="tabs-manager__tabs-container">
                {tabsToRender}
                <div className="tabs-manager__spacer"></div>
            </div>
            <div className="tabs-manager__content">
                {tabsArray.filter((note) => note.name===activeTab)[0].component}
            </div>
        </section>
    )
}