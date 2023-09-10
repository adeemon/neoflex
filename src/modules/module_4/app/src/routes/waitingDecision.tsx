import * as React from 'react';
import { TitleDescTextBlock } from '../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';
import { getStatusFromApi } from '../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../redux/store/store';

export const WaitingDecision: React.FC = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(getStatusFromApi());
    }, 10000);
  }, []);
  return (
    <TitleDescTextBlock
      title="Wait for a decision on the application"
      desc="The answer will come to your mail within 10 minutes"
    />
  );
};
