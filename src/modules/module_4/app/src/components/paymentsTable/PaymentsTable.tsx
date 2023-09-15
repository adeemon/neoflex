import * as React from 'react';
import { useSelector } from 'react-redux';
import { ITableNote, ITableProps, ITableRow, Table } from '../table/Table';
import { selectPayments } from '../../redux/slices/loanOffersSlice';
import { insertSpaceBeforeUpperLetter } from '../../utils';

export const PaymentsTable: React.FC = () => {
  const payments = useSelector(selectPayments);
  const adaptPaymentToTable = React.useMemo((): ITableProps => {
    let rows: ITableRow[] = [];
    let keys: string[] = [];
    if (payments && payments.length > 1) {
      Object.keys(payments[0]).forEach((element) =>
        keys.push(insertSpaceBeforeUpperLetter(element)));
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
    }
    let output: ITableProps = { keys, rows };
    return output;
  }, [payments]);

  return (
    <Table keys={ adaptPaymentToTable.keys } rows={ adaptPaymentToTable.rows } />
  );
};
