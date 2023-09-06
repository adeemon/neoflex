import * as React from 'react';
import { TitleDescTextBlock } from '../components/ui-toolkit/titleDescTextBlock/titleDescTextBlock';

export const WaitingDecision: React.FC = () =>
  (
    <TitleDescTextBlock
      title="Wait for a decision on the application"
      desc="The answer will come to your mail within 10 minutes"
    />
  );
