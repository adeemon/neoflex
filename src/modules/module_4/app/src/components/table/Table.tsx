import * as React from 'react';
import { ReactComponent as ArrowUp } from '../../assets/images/design/Arrow_drop_up.svg';
import { ReactComponent as ArrowDown } from '../../assets/images/design/Arrow_drop_down.svg';
import { insertSpaceBeforeUpperLetter } from '../../utils';

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

export interface ISortWays {
  sortWay: 'Descendente' | 'Ascendente' | 'None';
}

export interface ISortedKey {
  key: string;
  sortWay: ISortWays;
}


function compareTableNotes(first: ITableNote, second: ITableNote, descendente: ISortWays) {
  let descendenteMult = descendente ? 1 : -1;
  switch (descendente.sortWay) {
    case 'Descendente': {
      descendenteMult = 1;
      break;
    }
    case 'Ascendente': {
      descendenteMult = -1;
      break;
    }
    default: {
      descendenteMult = 0;
    }
  }
  const firstValue = first.value;
  const secondValue = second.value;
  if (firstValue === secondValue) {
    return 0;
  }
  if (typeof firstValue === 'number' && typeof secondValue === 'number') {
    return firstValue - secondValue > 0 ? -1 * descendenteMult : 1 * descendenteMult;
  }
  if (typeof firstValue === 'string' && typeof secondValue === 'string') {
    return secondValue.localeCompare(firstValue) * descendenteMult;
  }
  return 0;
}

const isSortedKeysArrayIncludesKey = (sortedArray: ISortedKey[], key: string) => {
  let output = false;
  sortedArray.forEach((element) => {
    if (element.key === key) {
      output = true;
    }
  });
  return output;
};

const getSortWay = (sortedArray: ISortedKey[], key: string): ISortWays =>
  sortedArray.filter((element) =>
    element.key.replace(' ', '') === key)[0].sortWay;

export const Table: React.FC<ITableProps> = ({ rows, keys }) => {
  const [sortedKey, setSortedKey] = React.useState<ISortedKey[]>([]);
  const getKeys = keys.map((key) => {
    let notSortedOrAscendente = false;
    const isKeySorted = isSortedKeysArrayIncludesKey(sortedKey, key);
    if (isKeySorted) {
      console.log(Object.values(getSortWay(sortedKey, key.replace(' ', '')))[0], 'Descendente');
      notSortedOrAscendente = Object.values(getSortWay(sortedKey, key.replace(' ', '')))[0] === 'Descendente';
    }
    return (
      <th className="table__key-wrapper" key={ key }>
        <p className="table__key-title">{key}</p>
        <button
          type="button"
          className="table__key-button"
          onClick={() => {
            if (isKeySorted) {
              console.log(isKeySorted);
              setSortedKey(
                sortedKey.map((element) => {
                  if (element.key === key) {
                    const newSortedKey: ISortedKey = {
                      key: element.key,
                      sortWay: element.sortWay,
                    };
                    if (newSortedKey.sortWay.sortWay === 'None') {
                      newSortedKey.sortWay.sortWay = 'Ascendente';
                      notSortedOrAscendente = true;
                    } else if (newSortedKey.sortWay.sortWay === 'Ascendente') {
                      newSortedKey.sortWay.sortWay = 'Descendente';
                      notSortedOrAscendente = false;
                    } else if (newSortedKey.sortWay.sortWay === 'Descendente') {
                      newSortedKey.sortWay.sortWay = 'Ascendente';
                      notSortedOrAscendente = true;
                    }
                    return newSortedKey;
                  }
                  return element;
                }),
              );
            } else {
              const newSortedKey: ISortedKey = {
                key,
                sortWay: { sortWay: 'Descendente' },
              };
              setSortedKey([...sortedKey, newSortedKey]);
            }
          }}
        >
          {!notSortedOrAscendente ? <ArrowUp /> : <ArrowDown />}
        </button>
      </th>
    );
  });
  const rowsSorted = React.useMemo(() => {
    if (sortedKey.length === 0) {
      return rows;
    }
    if (rows) {
      const getRowsSorted = [...rows].sort((firstRow, secondRow) => {
        let output = 0;
        if (firstRow! && firstRow.cells && secondRow.cells) {
          firstRow && firstRow.cells.forEach((element: ITableNote, index: number) => {
            if (secondRow.cells) {
              const secondCell = secondRow.cells[index];
              let sortWay: ISortWays = { sortWay: 'None' };
              if (isSortedKeysArrayIncludesKey(sortedKey, insertSpaceBeforeUpperLetter(element.key))) {
                sortWay = getSortWay(sortedKey, element.key);
              }
              output += compareTableNotes(element, secondCell, sortWay);
            }
          });
        }
        return output;
      });
      return getRowsSorted;
    }
  }, [sortedKey, rows, keys]);
  const getRowsToRender = rowsSorted?.map((row, index) => {
    let output: React.ReactElement[] = [];
    if (row.cells) {
      output = row.cells.map((cell, index) =>
        (
          <td className="table__cell" key={index}>{ cell.value }</td>
        ));
    }
    return (
      <tr className="table__row" key={ index }>{ output }</tr>
    );
  });
  return (
    <table className="table">
      <thead>
        <tr className="table__row">
          { getKeys }
        </tr>
      </thead>
      <tbody>
        { getRowsToRender }
      </tbody>
    </table>
  );
};
