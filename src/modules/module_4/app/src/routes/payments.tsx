import * as React from 'react';
import { useSelector } from 'react-redux';
import { ITableNote, ITableProps, ITableRow, Table } from '../components/table/Table';
import { ELoanSteps } from '../interfaces';
import { getStatusFromApi, selectAppId, selectPayments, setStatusLoan } from '../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../redux/store/store';

export const Payments: React.FC = () => {
  const payments = useSelector(selectPayments);
  const applicationId = useSelector(selectAppId);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getStatusFromApi(applicationId));
    dispatch(setStatusLoan(ELoanSteps.PaymentsShown));
  }, [applicationId]);
  React.useEffect(() => {
    console.log(payments);
    console.log('Я ТУТА ЕБАНА');
  }, [payments]);

  const adaptPaymentToTable = (): ITableProps => {
    let rows: ITableRow[] = [];
    let keys: string[] = [];
    if (payments) {
      Object.keys(payments[0]).forEach((element) =>
        keys.push(element));
    }
    payments?.forEach((element) => {
      const cells: ITableNote[] = Object.entries(element).map((note) => {
        const key = note[0];
        const value = note[1];
        const output: ITableNote = {
          key,
          value,
        };
        return output;
      });
      const row: ITableRow = { cells };
      rows.push(row);
    });
    let output: ITableProps = { keys, rows };
    return output;
  };

  return (
    <Table keys={ adaptPaymentToTable().keys } rows={ adaptPaymentToTable().rows } />
  );
};
