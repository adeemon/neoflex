import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { string, InferType } from 'yup';
import { format, subYears } from 'date-fns';
import { Select } from '../select/Select';
import { parseDateString } from '../../utils';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { useAppDispatch } from '../../redux/store/store';
import { getLoansByPrescoring, selectLoanStatus } from '../../redux/slices/loanOffersSlice';
import { ELoanSteps } from '../../interfaces';
import { SelectAmount } from '../selectAmount/SelectAmount';
import { Spinner } from '../spinner/Spinner';


const formDataSchema = Yup.object({
  lastName: string().required('Enter your last name'),
  firstName: string().required('Enter your first name'),
  middleName: string().nullable().defined(),
  email: string().email('Enter the corect email').required('Enter your email'),
  birthdate: Yup.date()
    .transform(parseDateString)
    .required('Enter you birthday as dd.mm.yyyy')
    .typeError('Please enter a valid date')
    .max((format(subYears(new Date(), 18), 'dd.MM.yyyy')), 'Date is too early'),
  term: string().required(),
  passportNumber: Yup.number()
    .required('Enter your password number')
    .min(100000, 'The series must be 6 digits')
    .max(999999, 'The series must be 6 digits'),
  passportSeries: Yup.number()
    .required('Enter your password series')
    .min(1000, 'The series must be 4 digits')
    .max(9999, 'The series must be 4 digits'),
});

export type TPrescoringFormData = InferType<typeof formDataSchema>;
export type TPostLoanTypeData = TPrescoringFormData & { amount: number };

export const PrescoringForm: React.FC = () => {
  const [isValidated, setIsValidated] = React.useState(false);
  const [amount, setAmount] = React.useState(50000);
  const dispatch = useAppDispatch();
  const loanStatus = useSelector(selectLoanStatus);
  const isLoading = loanStatus === ELoanSteps.WaitingPrescoringAnswer;

  const { handleSubmit, control } = useForm<TPrescoringFormData>({
    resolver: yupResolver(formDataSchema),
    defaultValues: {
      lastName: 'Ilya',
      firstName: 'Ustimov',
      middleName: 'Abs',
      term: '6',
      email: 'adeemon98@gmail.com',
      birthdate: new Date('02.08.1998'),
      passportNumber: 111111,
      passportSeries: 1111,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<TPrescoringFormData> = (data) => {
    const output: TPostLoanTypeData = { ...data, amount };
    output.term = (output.term.replace(/\D{1,}/, ''));
    dispatch(getLoansByPrescoring(output));
    setAmount(amount);
  };

  const onValidAttempt = () => {
    setIsValidated(true);
  };

  const form = (
    <form
      className="prescoring-form"
      onSubmit={ handleSubmit(onSubmit) }
      id="prescoring-form"
    >
      <div className="prescoring-form__contact-info">
        <p className="prescoring-form__small-title">
          Contact information
        </p>
        <div className="prescoring-form__inputs-wrapper">
          <div className="prescoring-form__input-container">
            <Label title="Your last name" elementId="lastName" isRequired />
            <Controller
              name="lastName"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    placeholder="For Example Doe"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your first name" elementId="firstName" isRequired />
            <Controller
              name="firstName"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    placeholder="For Example Jhon"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your patronymic" elementId="middleName" />
            <Controller
              name="middleName"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    placeholder="For Example Victorovich"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Select term" elementId="term" isRequired />
            <Controller
              name="term"
              control={ control }
              render={ ({
                field, fieldState: {
                  error,
                },
              }) =>
                (
                  <Select
                    values={ ['6 month', '12 month', '18 month', '24 month'] }
                    errorMessage={ error?.message }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your email" elementId="email" />
            <Controller
              name="email"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    placeholder="test@gmail.com"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your date of birth" elementId="birthdate" isRequired />
            <Controller
              name="birthdate"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    placeholder="Select date and Time"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your passport series" elementId="passportSeries" isRequired />
            <Controller
              name="passportSeries"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    type="number"
                    placeholder="0000"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
          <div className="prescoring-form__input-container">
            <Label title="Your passport number" elementId="passportNumber" isRequired />
            <Controller
              name="passportNumber"
              control={ control }
              render={ ({
                field, fieldState: {
                  invalid,
                  error,
                },
              }) =>
                (
                  <Input
                    type="number"
                    placeholder="000000"
                    errorMessage={ error?.message }
                    isInvalid={ invalid }
                    isValidated={ isValidated }
                    { ...field }
                  />
              ) }
            />
          </div>
        </div>
      </div>
      <ButtonMain
        label="Continue"
        className="prescoring-form__submit"
        formAction="submit"
        onClick={ () => { onValidAttempt(); handleSubmit((onSubmit))(); } }
      />
    </form>
  );

  const renderElement = (
    <div className="prescoring-form__wrapper">
      <SelectAmount />
      { form }
    </div>
  );

  return (
    <Spinner isLoading={isLoading}>
      {renderElement}
    </Spinner>
  );
};
