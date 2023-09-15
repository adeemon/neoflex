import * as React from 'react';
import spinnerSvg from '../../assets/images/design/Spinner.svg';

interface IProps {
  isLoading: boolean;
  children: JSX.Element | React.ReactElement | JSX.Element[] | (() => JSX.Element) | null;
}

export const Spinner: React.FC<IProps> = ({ isLoading, children }: IProps) => {
  const elementToRender = isLoading
    ? <img src={ spinnerSvg } className="rot" alt="spinner" />
    : (children);
  return (
    <>
      { elementToRender }
    </>
  );
};
