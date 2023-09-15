import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Input } from '../input/Input';
import { Slider } from '../ui-toolkit/slider/Slider';

const formDataSchema = Yup.object({
  amount: Yup.number().required('Input number')
    .typeError('Input number')
    .min(15000, 'Input more 15000')
    .max(600000, 'Input less 600000'),
});

export type TSelectAmountData = Yup.InferType<typeof formDataSchema>;
export const SelectAmount: React.FC = () => {
  const [amountTemp, setAmountTemp] = React.useState(150000);
  const { handleSubmit, control } = useForm<TSelectAmountData>({
    resolver: yupResolver(formDataSchema),
    defaultValues: {
      amount: amountTemp,
    },
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<TSelectAmountData> = (data) => {
    setAmountTemp(data.amount);
  };

  const form = (
    <form
      className="select-amount-form"
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleSubmit(onSubmit)}
    >
      <div className="select-amount-form__customize-card">
        <div className="select-amount-form__amount">
          <p className="select-amount-form__title">
            Customize your card
          </p>
          <p className="select-amount-form__step">
            Step 1 of 5
          </p>
          <div className="select-amount-form__select-amount">
            <p className="select-amount-form__step">
              Select amount
            </p>
            <Controller
              name="amount"
              control={ control }
              render={ ({ field, fieldState: { error } }) =>
                (
                  <Input
                    type="number"
                    errorMessage={ error?.message }
                    className="select-amount-form__amount-input"
                  {...field}
                  />
                ) }
            />
            <Slider min={ 15000 } max={ 600000 } current={ amountTemp } />
          </div>
        </div>
        <div className="select-amount-form__result">
          <p className="select-amount-form__small-title">
            You have chosen the amount
          </p>
          <p className="select-amount-form__amount-content">
            { amountTemp > 15000 && amountTemp < 600000 ? amountTemp : 'Incorrect amount' }
          </p>
        </div>
      </div>
    </form>
  );
  return (
    <>
      { form }
    </>
  );
};
