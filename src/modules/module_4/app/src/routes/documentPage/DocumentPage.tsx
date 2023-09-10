import * as React from 'react';
import { useSelector } from 'react-redux';
import { PaymentsAgreeOPtions } from '../../components/paymentsAgreeOptions/PaymentsAgreeOptions';
import { PaymentsTable } from '../../components/paymentsTable/PaymentsTable';
import { TitleDescTextBlock } from '../../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';
import { ELoanSteps } from '../../interfaces';
import { getStatusFromApi, selectAppId, selectLoanStatus, setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { selectIsRestored } from '../../redux/slices/userStorageSlice';
import { useAppDispatch } from '../../redux/store/store';

export const DocumentPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoaded = useSelector(selectIsRestored);
  const appId = useSelector(selectAppId);
  const isDocsAccepted = useSelector(selectLoanStatus) === ELoanSteps.DocumentAccepted;
  React.useEffect(() => {
    if (isLoaded) {
      dispatch(getStatusFromApi());
      dispatch(setStatusLoan(ELoanSteps.DocumentOpened));
    }
  }, [isLoaded, appId]);
  return (
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
  );
};
