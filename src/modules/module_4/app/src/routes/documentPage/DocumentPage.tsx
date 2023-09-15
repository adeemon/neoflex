import * as React from 'react';
import { useSelector } from 'react-redux';
import { ElementFirstOpenWrapper } from '../../components/elementFirstOpenWrapper/ElementFirstOpenWrapper';
import { PaymentsAgreeOPtions } from '../../components/paymentsAgreeOptions/PaymentsAgreeOptions';
import { PaymentsTable } from '../../components/paymentsTable/PaymentsTable';
import { Spinner } from '../../components/spinner/Spinner';
import { TitleDescTextBlock } from '../../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';
import { ELoanSteps } from '../../interfaces';
import {
  getStatusFromApi,
  selectIsLoading,
  selectLoanStatus,
} from '../../redux/slices/loanOffersSlice';
import { selectIsRestored } from '../../redux/slices/userStorageSlice';
import { useAppDispatch } from '../../redux/store/store';

export const DocumentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoaded = useSelector(selectIsRestored);
  const currentStatus = useSelector(selectLoanStatus);
  const isDocsAccepted = currentStatus === ELoanSteps.DocumentsSigned;
  const isLoading = useSelector(selectIsLoading);
  React.useEffect(() => {
    if (isLoaded && !isDocsAccepted) {
      dispatch(getStatusFromApi());
    }
  }, [isLoaded]);

  return (
    <ElementFirstOpenWrapper
      previousState={ ELoanSteps.ScoringApproved }
      newState={ ELoanSteps.DocumentOpened }
    >
      <Spinner isLoading={ isLoading }>
        <div className="document__wrapper">
          { isDocsAccepted
            ? (
              <TitleDescTextBlock
                title="Documents are formed"
                desc="Documents for signing will be sent to your email"
              />
            )
            : (
              <>
                <PaymentsTable />
                <PaymentsAgreeOPtions />
              </>

            ) }
        </div>
      </Spinner>
    </ElementFirstOpenWrapper>
  );
};
