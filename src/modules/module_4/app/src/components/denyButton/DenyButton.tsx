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
    dispatch(setStatusLoan(ELoanSteps.AppClosed));
    setIsDeny(true);
  };
  const onOfterDeny = () => {
    navigate('/');
  };
  const firstModal = (
    <Modal
      isOpened={ isOpened }
      title={ title }
      describtion={ describtion }
      isOnlyProceed={ isOnlyProceed }
      onClose={ () =>
        setIsOpened(false) }
      onProceed={ onDeny }
      proceedLabel="Cancel"
      cancelLabel="Deny"
    />
  );

  const denyModal = (
    (
      <Modal
        isOpened={ isOpened }
        title={ title }
        describtion={ describtion }
        isOnlyProceed={ isOnlyProceed }
        onClose={ () =>
          setIsOpened(false) }
        onProceed={ onOfterDeny }
        proceedLabel="Go home"
        cancelLabel="Deny"
      />
    )
  );
  return (
    <div className="deny__wrapper">
      <ButtonMain className="deny__button" label="Deny" />
      { isDeny
        ? denyModal
        : firstModal }
    </div>
  );
};
