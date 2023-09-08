import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { selectAppId } from '../../redux/slices/loanOffersSlice';
import { useAppDispatch } from '../../redux/store/store';
import { Checkbox } from '../checkbox/Checkbox';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

const formDataChema = Yup.object({
  checkbox: Yup.boolean().oneOf([true], 'You have to accept'),
});

export type TPaymentAgree = Yup.InferType<typeof formDataChema>;

export const PaymentsAgreeOPtions: React.FC = () => {
  const dispatch = useAppDispatch();
  const applicationId = useSelector(selectAppId);
  const { handleSubmit, control } = useForm<TPaymentAgree>({
    resolver: yupResolver(formDataChema),
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
          name="checkbox"
          control={control}
          render={({ field, fieldState: { error } }) =>
          (
            <Checkbox
              label="I agree with the payment schedule"
              errorMessage={error?.message}
              {...field}
            />
          )}
        />
      </div>
      <ButtonMain
        label="Send"
        className="paymentAgreeForm__accept"
        onClick={() => { handleSubmit(onSubmit)(); }}
      />
    </form>
  );
  return (form);
};