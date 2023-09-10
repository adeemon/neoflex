import surpriseImg from '../../assets/images/design/surprise.png';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import { TitleDescTextBlock } from '../ui-toolkit/titleDescTextBlock/titleDescTextBlock';


export const CrediCongratulations: React.FC = () =>
  (
    <section className="credit-congrat">
      <ImageFigured src={ surpriseImg } />
      <TitleDescTextBlock
        title="Congratulations! You have completed your new credit card."
        desc="Your credit card will arrive soon. Thank you for choosing us!"
      />
      <ButtonMain
        className="credit-congrat__button"
        label="View other offers of our bank"
      />
    </section>
  );
