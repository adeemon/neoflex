import firstCard from '../../assets/images/content/cards/cardImage1 1.svg';
import secondCard from '../../assets/images/content/cards/cardImage2 1.svg';
import thirdCard from '../../assets/images/content/cards/cardImage3 1.svg';
import fourCard from '../../assets/images/content/cards/cardImage4 1.svg';

function CardDesigns () {
    return (
        <section className="card-designs">
            <h2 className="card-designs__text">
                Choose the design you like and apply for card right now
            </h2>
            <button className="card-designs__choose-button">
            <span className="card-designs__button-label">Choose the card</span>
          </button>
            <ul className="card-designs__designs-list">
                <li className="card-designs__design-example">
                    <figure className="card-designs__design-figure">
                        <img src={firstCard} alt="Blue wave design" className="card-designs__design-image" />
                    </figure>
                </li>
                <li className="card-designs__design-example">
                    <figure className="card-designs__design-figure">
                        <img src={secondCard} alt="Planet design" className="card-designs__design-image" />
                    </figure>
                </li>
                <li className="card-designs__design-example">
                    <figure className="card-designs__design-figure">
                        <img src={thirdCard} alt="Light design" className="card-designs__design-image" />
                    </figure>
                </li>
                <li className="card-designs__design-example">
                    <figure className="card-designs__design-figure">
                        <img src={fourCard} alt="Space design" className="card-designs__design-image" />
                    </figure>
                </li>
            </ul>
        </section>
    )
}

export default CardDesigns;