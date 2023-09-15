import * as React from 'react';
import { TitleDescTextBlock } from '../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';

export const PreliminaryDecision: React.FC = () => {
  const title = 'The preliminary decision has been sent to your email.';
  const desc = 'In the letter you can get acquainted with the preliminary decision on the credit card.';
  return (
    <div className="preliminary">
      <TitleDescTextBlock title={title} desc={desc} />
    </div>
  );
};