import * as React from 'react';
import { ReactComponent as PhotoIcon } from '../../assets/images/design/Money_duotone.svg';
import { ReactComponent as CalendarIcon } from '../../assets/images/design/Calendar_duotone.svg';
import { ReactComponent as ClockIcon } from '../../assets/images/design/Clock_duotone.svg';
import { ReactComponent as BagIcon } from '../../assets/images/design/Bag_duotone.svg';
import { ReactComponent as CreditCardIcon } from '../../assets/images/design/Credit card_duotone.svg';
import { IInfoCardIconProps, InfoCardIcon } from '../infoCardIcon/InfoCardIcon';


const content: IInfoCardIconProps[] = [
  {
    title: 'Up to 50 000 ₽',
    description: 'Cash and transfers without commission and percent',
    IconComponent: PhotoIcon,
    isOdd: false,
  },
  {
    title: 'Up to 160 days',
    description: 'Without percent on the loan',
    IconComponent: CalendarIcon,
    isOdd: true,
  },
  {
    title: 'Free delivery',
    description: 'We will deliver your card by courier at a convenient place and time for you',
    IconComponent: ClockIcon,
    isOdd: false,
  },
  {
    title: 'Up to 12 months',
    description: 'No percent. For equipment, clothes and other purchases in installments',
    IconComponent: BagIcon,
    isOdd: true,
  },
  {
    title: 'Convenient deposit and withdrawal',
    description: 'At any ATM. Top up your credit card for free with cash or transfer from other cards',
    IconComponent: CreditCardIcon,
    isOdd: false,
  },
];

const cardsToRender = content.map((element, index) =>
  (
    <InfoCardIcon
      isOdd={ element.isOdd }
      title={ element.title }
      description={ element.description }
      IconComponent={ element.IconComponent }
      key={ index }
    />
  ));

export const AboutCardTab: React.FC = () =>
  (
    <section className="aboutCardTab">
      <div className="aboutCardTab__smallCards">
        { cardsToRender.slice(0, 3) }
      </div>
      <div className="aboutCardTab__bigCards">
        { cardsToRender.slice(-2) }
      </div>
    </section>
  );
