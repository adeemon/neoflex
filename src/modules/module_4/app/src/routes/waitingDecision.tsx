import * as React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '../components/spinner/Spinner';
import { TitleDescTextBlock } from '../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';
import { getStatusFromApi, selectAppId } from '../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../redux/store/store';

export const WaitingDecision: React.FC = () => {
  const dispatch = useAppDispatch();
  const applicationId = useSelector(selectAppId);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(getStatusFromApi(applicationId));
      setIsLoading(false);
    }, 10000);
  }, []);
  return (
    <>
      {
        isLoading
          ? <Spinner />
          : (
            <TitleDescTextBlock
              title="Wait for a decision on the application"
              desc="The answer will come to your mail within 10 minutes"
            />
          )
      }
    </>
  );
};
