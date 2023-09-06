import * as React from 'react';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import cardImage from '../../assets/images/content/platinumCard.jpg';
import { LoanButton } from '../loanButton/LoanButton';


export const PlatinumCardAdv: React.FC = () =>
  (
    <section className="platinumCard">
      <h2 className="platinumCard__title">
        Platinum digital credit card
      </h2>
      <p className="platinumCard__desc">
        Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals and transfers without commission and interest.
      </p>
      <ul className="platinumCard__features">
        <li className="platinumCard__feature">
          <p className="platinumCard__feature-title">
            Up to 160 days
          </p>
          <p className="platinumCard__feature-add">
            No percent
          </p>
        </li>
        <li className="platinumCard__feature">
          <p className="platinumCard__feature-title">
            Up to 600 000 ₽
          </p>
          <p className="platinumCard__feature-add">
            Credit limit
          </p>
        </li>
        <li className="platinumCard__feature">
          <p className="platinumCard__feature-title">
            0 ₽
          </p>
          <p className="platinumCard__feature-add">
            Card service is free
          </p>
        </li>
      </ul>
      <LoanButton />
      <ImageFigured className="platinumCard__image" src={ cardImage } />
    </section>
  );
