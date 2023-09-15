import * as React from 'react';
import firstCard from '../../assets/images/content/cards/cardImage1 1.svg';
import secondCard from '../../assets/images/content/cards/cardImage2 1.svg';
import thirdCard from '../../assets/images/content/cards/cardImage3 1.svg';
import fourCard from '../../assets/images/content/cards/cardImage4 1.svg';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';


const deisgnsArray: string[] = [firstCard, secondCard, thirdCard, fourCard];
const disignsToRender = deisgnsArray.map((designPath, index) =>
  (
    <li className="card-designs__design-example" key={ index }>
      <ImageFigured className="card-designs__design-figure" src={ designPath } />
    </li>
  ));

const CardDesigns: React.FC = () =>
  (
    <section className="card-designs">
      <h2 className="card-designs__text">
        Choose the design you like and apply for card right now
      </h2>
      <button type="button" className="card-designs__choose-button">
        <span className="card-designs__button-label">Choose the card</span>
      </button>
      <ul className="card-designs__designs-list">
        { disignsToRender }
      </ul>
    </section>
  );

export default CardDesigns;
