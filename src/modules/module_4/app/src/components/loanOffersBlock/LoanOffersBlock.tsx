import * as React from 'react';
import { useSelector } from 'react-redux';
import { ELoanSteps, IloanOffer } from '../../interfaces';
import { selectLoanOffers } from '../../redux/selectors/selectors';
import { setStatus } from '../../redux/slices/userStorageSlice';
import { useAppDispatch } from '../../redux/store/store';
import { compareTwoLoanOffers } from '../../utils';
import { LoanOffer } from '../loanOffer/LoanOffer';

export const LoanOffersBlock: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedResponce = useSelector(selectLoanOffers);
  const arrayOfOffers: IloanOffer[] | null = selectedResponce;
  const sortedOffers = arrayOfOffers && [...arrayOfOffers].sort((a, b) =>
    compareTwoLoanOffers(a, b));
  const elementsToRender = sortedOffers?.map((offer, index) =>
    (
      <LoanOffer { ...offer } key={ `${offer.applicationId}${index}` } />
  ));
  React.useEffect(() => {
    // const currentId = (arrayOfOffers) ? arrayOfOffers[0].applicationId : null;
    dispatch(setStatus(ELoanSteps.GotPrescoring));
    console.log('Статут изменен');
  }, []);
  return (
    <section className="loanOffers" id="loanOffersWrapper">
      { elementsToRender }
    </section>
  );
};
