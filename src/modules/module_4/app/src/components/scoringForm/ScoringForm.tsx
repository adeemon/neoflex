import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, mixed, number } from 'yup';
import { Select } from '../select/Select';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { useAppDispatch } from '../../redux/store/store';
import { IEmploymentData, IScoringDataToSend } from '../../interfaces';
import { IPostScoringSign, postScoring, selectAppId } from '../../redux/slices/loanOffersSlice';


const formDataSchema = Yup.object({
  gender: mixed<string>()
    .oneOf(['Male', 'Famale'])
    .required('Select one of the options'),
  maritalStatus: mixed<string>()
    .oneOf(['Married', 'Divorced', 'Single', 'Widow widower'])
    .required('Select one of the options'),
  dependentAmount: mixed<string>()
    .oneOf(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    .required('Select one of the options'),
  passportIssueDate: Yup.string()
    .required('Enter your passport issue date as hh:mm dd.mm.yyyy')
    .test('is-less', 'Time must be earlier', (value) => {
      const nowTime = moment().format('HH:mm DD.MM.YYYY');
      return moment(value, 'HH:mm DD.MM.YYYY').isBefore(moment(nowTime));
    }),
  passportIssueBranch: number()
    .required()
    .min(100000, 'The series must be 6 digits')
    .max(999999, 'The series must be 6 digits'),
  employmentStatus: mixed<string>()
    .oneOf(['Unemployed', 'Self employed', 'Employed', 'Business owner'])
    .required('Select one of the options'),
  employerINN: number()
    .required()
    .min(100000000000, 'Department code must be 12 digits')
    .max(999999999999, 'Department cost must be 12 digits'),
  salary: number()
    .typeError('Enter the number')
    .required('Enter your salary'),
  position: mixed<string>()
    .oneOf(['Worker', 'Mid manager', 'Top manager', 'Owner'])
    .required('Select one of the options'),
  workExperienceTotal: number()
    .max(99, 'Enter your real experience')
    .required('Enter your work experience total'),
  workExpirienceCurrent: number()
    .max(99, 'Enter your real experience')
    .required('Enter your work experience current'),
});

export type TScoringFormData = InferType<typeof formDataSchema>;

export const ScoringForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const applicationId = useSelector(selectAppId);
  const [isValidated, setIsValidated] = React.useState(false);
  const { handleSubmit, control } = useForm<TScoringFormData>({
    resolver: yupResolver(formDataSchema),
    defaultValues: {
      gender: 'Male',
      maritalStatus: 'Married',
      dependentAmount: '1',
      passportIssueDate: '11:11 11.11.2000',
      passportIssueBranch: 123456,
      employmentStatus: 'Employed',
      employerINN: 123456789012,
      salary: 100000,
      position: 'Worker',
      workExperienceTotal: 15,
      workExpirienceCurrent: 4,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<TScoringFormData> = (data) => {
    console.log(data);
    const genderNew = data.gender.toUpperCase() as ('MALE' | 'FAMALE');
    const martialStatNew = data.maritalStatus.toUpperCase()
      .replace(' ', '_') as ('MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER');
    const dependentAmountNew = Number.parseInt(data.dependentAmount, 10);
    const passportIssueNew = moment(data.passportIssueDate).format('YYYY-MM-DD');
    const passportIssueBranchNew = `${data.passportIssueBranch}`;
    const employmentStatusNew = data.employmentStatus.toUpperCase()
      .replace(' ', '_') as ('UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER');
    const positionNew = data.position.toUpperCase()
      .replace(' ', '_') as ('WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER');
    const employmentData: IEmploymentData = {
      employmentStatus: employmentStatusNew,
      employerINN: `${data.employerINN}`,
      salary: data.salary,
      position: positionNew,
      workExperienceTotal: data.workExperienceTotal,
      workExperienceCurrent: data.workExpirienceCurrent,
    };
    const dataToSend: IScoringDataToSend = {
      gender: genderNew,
      maritalStatus: martialStatNew,
      dependentAmount: dependentAmountNew,
      passportIssueDate: passportIssueNew,
      passportIssueBranch: passportIssueBranchNew,
      employment: employmentData,
      account: null,
    };
    const postData: IPostScoringSign = {
      scoringData: dataToSend,
      applicationId: applicationId || 1,
    };
    dispatch(postScoring(postData));
  };

  const onValidAttempt = () => {
    setIsValidated(true);
  };

  const form = (
    <form className="scoring-form" onSubmit={ handleSubmit(onSubmit) }>
      <p className="scoring-form__title">Continuation of the application</p>
      <p className="scoring-form__step">Step 2 of 5</p>
      <div className="scoring-form__input-container">
        <Label title="What's your gender" elementId="gender" isRequired />
        <Controller
          name="gender"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Select
                values={ ['Male', 'Famale'] }
                errorMessage={ error?.message }
                isInvalid={ invalid }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label title="Your marital" elementId="maritalStatus" isRequired />
        <Controller
          name="maritalStatus"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Select
                values={ ['Married', 'Divorced', 'Single', 'Widow widower'] }
                errorMessage={ error?.message }
                isInvalid={ invalid }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label title="Your number of dependents" elementId="dependentAmount" />
        <Controller
          name="dependentAmount"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Select
                values={ ['1', '2', '3', '4', '5', '6', '7', '8', '9'] }
                isInvalid={ invalid }
                errorMessage={ error?.message }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container-big">
        <Label
          title="Date of issue of the passport"
          elementId="passportIssueDate"
        />
        <Controller
          name="passportIssueDate"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="Select Date and Time"
                type="string"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container-big">
        <Label title="Division code" elementId="passportIssurBranch" />
        <Controller
          name="passportIssueBranch"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="000000"
                type="number"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <p className="scoring-form__small-title">Employment</p>
      <div className="scoring-form__input-container">
        <Label title="Your employement status" elementId="employmentStatus" />
        <Controller
          name="employmentStatus"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Select
                errorMessage={ error?.message }
                isInvalid={ invalid }
                values={ [
                  'Unemployed',
                  'Self employed',
                  'Employed',
                  'Business owner',
                ] }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label title="Your employement status" elementId="employerINN" />
        <Controller
          name="employerINN"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="000000000000"
                type="number"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label title="Your salary" elementId="salary" />
        <Controller
          name="salary"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="For example 100 000"
                type="number"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label title="Your position" elementId="position" />
        <Controller
          name="position"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Select
                errorMessage={ error?.message }
                isInvalid={ invalid }
                values={ ['Worker', 'Mid manager', 'Top manager', 'Owner'] }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label
          title="Your work experience total"
          elementId="workExperienceTotal"
        />
        <Controller
          name="workExperienceTotal"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="For example 10"
                type="number"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__input-container">
        <Label
          title="Your work experience current"
          elementId="workExpirienceCurrent"
        />
        <Controller
          name="workExpirienceCurrent"
          control={ control }
          render={ ({ field, fieldState: { invalid, error } }) =>
            (
              <Input
                placeholder="For example 2"
                type="number"
                errorMessage={ error?.message }
                isInvalid={ invalid }
                isValidated={ isValidated }
                { ...field }
              />
          ) }
        />
      </div>
      <div className="scoring-form__button-wrapper">
        <ButtonMain
          label="Continue"
          className="scoring-form__button"
          formAction="submit"
          onClick={ () => {
            onValidAttempt();
            handleSubmit(onSubmit)();
          } }
        />
      </div>
    </form>
  );

  return <>{ form }</>;
};
