import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  postChoosedOffer,
  selectChoosedOffer,
  selectLoanStatus,
  setStatusLoan,
} from '../../redux/slices/loanOffersSlice';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { AppDispatch, useAppDispatch } from '../../redux/store/store';
import { ELoanSteps, IloanOffer } from '../../interfaces';
// import { setStatus } from '../../redux/slices/userStorageSlice';

const applyForCard = (
  <a href="#prescoring-form">
    <ButtonMain className="platinumCard__apply-button" label="Apply for card" />
  </a>
);

const chooseAnOffer = (
  <a href="#loanOffersWrapper">
    <ButtonMain label="Choose an offer" />
  </a>
);

const getContinueRegButton = (dispatch: AppDispatch, offer: IloanOffer | null, disabled?: boolean) => {
  const onClick = () => {
    dispatch(postChoosedOffer(offer));
    dispatch(setStatusLoan(ELoanSteps.LoansSended));
  };
  return (
    <ButtonMain
      label="Continue registration"
      onClick={ onClick }
      isDisabled={ disabled }
    />
  );
};
const getButtonToRender = (status: ELoanSteps, offer: IloanOffer | null, dispatch: AppDispatch) => {
  switch (status) {
    case ELoanSteps.PrescoringStarted: {
      return applyForCard;
    }
    case (ELoanSteps.LoanOffers): {
      return chooseAnOffer;
    }
    case ELoanSteps.LoanChoosed: {
      return getContinueRegButton(dispatch, offer);
    }
    default: {
      return getContinueRegButton(dispatch, offer, true);
    }
  }
};

export const LoanButton: React.FC = () => {
  const loanStatus = useSelector(selectLoanStatus);
  const dispatch = useAppDispatch();
  const currentOffer = useSelector(selectChoosedOffer);
  const buttonToRender = getButtonToRender(loanStatus, currentOffer, dispatch);
  return <>{ buttonToRender }</>;
};
