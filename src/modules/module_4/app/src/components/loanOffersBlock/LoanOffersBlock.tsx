import * as React from 'react';
import { useSelector } from 'react-redux';
import { IloanOffer } from '../../interfaces';
import { selectLoanOffers } from '../../redux/selectors/selectors';
import { compareTwoLoanOffers } from '../../utils';
import { LoanOffer } from '../loanOffer/LoanOffer';

export const LoanOffersBlock: React.FC = () => {
  const selectedResponce = useSelector(selectLoanOffers);
  const arrayOfOffers: IloanOffer[] | null = selectedResponce;
  const sortedOffers = arrayOfOffers && [...arrayOfOffers].sort((a, b) =>
    compareTwoLoanOffers(a, b));
  const elementsToRender = sortedOffers?.map((offer, index) =>
    (
      <LoanOffer { ...offer } key={ `${offer.applicationId}${index}` } />
  ));
  return (
    <section className="loanOffers" id="loanOffersWrapper">
      { elementsToRender }
    </section>
  );
};
