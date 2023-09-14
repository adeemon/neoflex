import surpriseImg from '../../assets/images/design/surprise.png';
import { ELoanSteps } from '../../interfaces';
import { setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { ImageFigured } from '../ui-toolkit/imageFigured/ImageFigured';
import { TitleDescTextBlock } from '../ui-toolkit/titleDescTextBlock/titleDescTextBlock';


export const CrediCongratulations: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setStatusLoan(ELoanSteps.LoanCompleted));
  };
  return (
    <section className="credit-congrat">
      <ImageFigured
        src={ surpriseImg }
        className="credit-congrat__img"
      />
      <TitleDescTextBlock
        title="Congratulations! You have completed your new credit card."
        desc="Your credit card will arrive soon. Thank you for choosing us!"
      />
      <ButtonMain
        className="credit-congrat__button"
        label="View other offers of our bank"
        onClick={ onClickHandler }
      />
    </section>
  );
};
