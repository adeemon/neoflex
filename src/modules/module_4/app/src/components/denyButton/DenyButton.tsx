import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ELoanSteps } from '../../interfaces';
import { setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { Modal } from '../modal/Modal';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

export const DenyButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = React.useState(false);
  const [isDeny, setIsDeny] = React.useState(false);
  const navigate = useNavigate();
  const describtion = isDeny
    ? 'Your application has been deny!'
    : 'You exactly sure, you want to cancel this application?';
  const title = 'Deny application';
  const isOnlyProceed = isDeny;
  const onDeny = () => {
    setIsDeny(true);
  };
  const onOfterDeny = () => {
    dispatch(setStatusLoan(ELoanSteps.AppClosed));
    navigate('/');
  };
  const firstModal = (
    <Modal
      isOpened={ isOpened }
      title={ title }
      describtion={ describtion }
      isOnlyProceed={ isOnlyProceed }
      onClose={() =>
        setIsOpened(false)}
      onProceed={ onDeny }
      proceedLabel="Cancel"
      cancelLabel="Deny"
      isCloseAfterProceed={ false }
    />
  );

  const denyModal = (
    (
      <Modal
        isOpened={ isOpened }
        title={ title }
        describtion={ describtion }
        isOnlyProceed={ isOnlyProceed }
        onClose={ () => {
          onOfterDeny();
          setIsOpened(false);
        } }
        onProceed={ () => {
          onOfterDeny();
          setIsOpened(false);
        } }
        proceedLabel="Go home"
        cancelLabel="Deny"
      />
    )
  );
  return (
    <div className="deny__wrapper">
      <ButtonMain
        className="deny__button"
        label="Deny"
        onClick={ () =>
          setIsOpened(true) }
      />
      { isDeny
        ? denyModal
        : firstModal }
    </div>
  );
};
