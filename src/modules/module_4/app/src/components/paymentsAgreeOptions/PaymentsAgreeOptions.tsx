import * as React from 'react';
import { ELoanSteps } from '../../interfaces';
import { formDocuments, setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { CheckboxAgreeForm } from '../checkboxAgreeForm/CheckboxAgreeForm';
import { DenyButton } from '../denyButton/DenyButton';

export const PaymentsAgreeOPtions: React.FC = () => {
  const dispatch = useAppDispatch();
  const onSubmit = () => {
    dispatch(setStatusLoan(ELoanSteps.DocumentAccepted));
    dispatch(formDocuments());
  };
  const form = (
    <CheckboxAgreeForm
      checkboxTitle="I agree with the payment schedule"
      onSubmitDispatch={ onSubmit }
    />
  );
  return (
    <div className="paymentAgreeOptions__wrapper">
      <DenyButton />
      { form }
    </div>
  );
};
