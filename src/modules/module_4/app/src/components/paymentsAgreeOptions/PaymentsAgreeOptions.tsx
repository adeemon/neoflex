// import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { selectAppId } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { Checkbox } from '../checkbox/Checkbox';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

const formDataChema = Yup.object({
  paymentCheckbox: Yup.bool().oneOf([true], 'Checkbox selection is required'),
});

export type TPaymentAgree = Yup.InferType<typeof formDataChema>;

export const PaymentsAgreeOPtions: React.FC = () => {
  const dispatch = useAppDispatch();
  const applicationId = useSelector(selectAppId);
  const { handleSubmit, control, register } = useForm<TPaymentAgree>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const onSubmit = () => {
    console.log('gogogog');
    console.log(dispatch);
    console.log(applicationId);
  };
  const form = (
    <form className="paymentAgreeForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="paymentAgreeForm__checkbox">
        <Controller
          name="paymentCheckbox"
          control={control}
          rules={{ required: 'this is req' }}
          render={({ field, fieldState: { error } }) =>
          (
            <Checkbox
              {...field}
              {...register('paymentCheckbox')}
              id="paymentCheckbox"
              label="I agree with the payment schedule"
              errorMessage={error?.message}
            />
          )}
        />
      </div>
      <ButtonMain
        label="Send"
        className="paymentAgreeForm__accept"
        type="submit"
        onClick={() => { handleSubmit(onSubmit)(); }}
      />
    </form>
  );
  return (form);
};