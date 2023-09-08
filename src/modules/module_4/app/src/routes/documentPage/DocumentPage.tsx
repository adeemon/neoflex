import * as React from 'react';
import { PaymentsAgreeOPtions } from '../../components/paymentsAgreeOptions/PaymentsAgreeOptions';
import { PaymentsTable } from '../../components/paymentsTable/PaymentsTable';

export const DocumentPage: React.FC = () =>
(
  <div className="document__wrapper">
    <PaymentsTable />
    <PaymentsAgreeOPtions />
  </div>
);