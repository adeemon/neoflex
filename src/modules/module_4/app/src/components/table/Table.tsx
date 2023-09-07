import * as React from 'react';
import { number } from 'zod';

export interface ITableProps {
  keys: string[];
  rows: ITableRow[] | null;
}

export interface ITableNote {
  value: string | number | null;
  key: string;
}

export interface ITableRow {
  cells: ITableNote[] | null;
}


function compare<T extends number | string> (first: T, second: T): number {
  if (first === second) {
    return 0;
  }
  if (typeof first === 'number' && typeof second === 'number') {
    return first - second > 0 ? 1 : -1;
  }
  if (typeof first === 'string' && typeof second === 'string') {
    return first.localeCompare(second);
  }
  return 0;
}

export const Table: React.FC<ITableProps> = ({ rows, keys }) => {
  const [sortedKey, setSortedKey] = React.useState<string[]>([]);
  const getKeys = keys.map((key) =>
  (
    <div className="table__key-wrapper">
      <p className="table__key-title">
        {key}
      </p>
    </div>
  ));
  const getRowsSorted = rows?.sort((firstRow, secondRow) => {
    let output = 0;
    
    firstRow && firstRow!.cells.forEach((element: ITableNote, index: number) => {
      if (sortedKey.includes(element.key)) {
        if (typeof element === 'string') {
          let second = secondRow?.cells[index].value || '';
          output += element.value - secondRow?.cells[index].value;
        }
      }
    })
    return output;
  });
  return (
    <>
      {getKeys}
    </>
  );
};


