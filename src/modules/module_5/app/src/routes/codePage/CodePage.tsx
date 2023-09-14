import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CrediCongratulations } from '../../components/creditCongratulations/CreditCongratulations';
import { Spinner } from '../../components/spinner/Spinner';
import { ELoanSteps } from '../../interfaces';
import { postCode, selectIsLoading, selectLoanStatus, setStatusLoan } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';

export const CodePage: React.FC = () => {
  const [inputedNumber, setInputedNumber] = useState<string >('');
  const isCodeInputed = inputedNumber && Number.parseInt(inputedNumber, 10) > 999;
  const dispatch = useAppDispatch();
  const currentState = useSelector(selectLoanStatus);
  const isError = currentState === ELoanSteps.CodeRejected;
  const isCompleted = currentState === ELoanSteps.CreditIssued;
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    if (isCodeInputed) {
      dispatch(postCode(inputedNumber));
    }
  }, [isCodeInputed]);
  useEffect(() => {
    dispatch(setStatusLoan(ELoanSteps.DocumentsSigned));
  }, []);

  const codeStep = (
    <section className="code">
      <p className="code__title big-title">
        Please enter confirmation code
      </p>
      <label htmlFor="code__number-id" className="code__wrapper">
        <div className={ `code__box ${inputedNumber?.length >= 0
          ? 'code__box-active' : ''} 
          ${inputedNumber?.length < 1 ? 'code__box-empty' : ''}` }
        >
          { inputedNumber?.toString()[0] }
        </div>
        <div className={ `code__box ${inputedNumber.length >= 1
          ? 'code__box-active' : ''} 
          ${inputedNumber?.length < 2 ? 'code__box-empty' : ''}` }
        >
          { inputedNumber?.toString()[1] }
        </div>
        <div className={ `code__box ${inputedNumber?.length >= 2
          ? 'code__box-active' : ''} 
          ${inputedNumber.length < 3 ? 'code__box-empty' : ''}` }
        >
          { inputedNumber?.toString()[2] }
        </div>
        <div className={ `code__box ${inputedNumber?.length >= 3
          ? 'code__box-active' : ''} 
          ${inputedNumber.length < 4 ? 'code__box-empty' : ''}` }
        >
          { inputedNumber?.toString()[3] }
        </div>
      </label>
      <input
        className="code__number"
        id="code__number-id"
        type="string"
        value={ inputedNumber }
        onChange={ (e) =>
          setInputedNumber(e.target.value.match(/\d{1,4}/)?.join('') || '') }
      />
      <p className="code__error">
        { isError && 'Invalid confirmation code' }
      </p>
    </section>
  );

  return (
    <Spinner isLoading={ isLoading }>
      { isCompleted
        ? <CrediCongratulations />
        : codeStep }
    </Spinner>
  );
};
