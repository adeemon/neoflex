import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { Checkbox } from '../checkbox/Checkbox';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';

const formDataChema = Yup.object({
  checkboxButton: Yup.bool().required('You have to agree').oneOf([true], 'You have to agree'),
});

interface ICheckboxTitleProps {
  checkboxTitle: string;
  onSubmitDispatch: () => void;
}

export type TCheckboxButton = Yup.InferType<typeof formDataChema>;

export const CheckboxAgreeForm: React.FC<ICheckboxTitleProps> = ({ checkboxTitle, onSubmitDispatch }) => {
  const { handleSubmit, control } = useForm<TCheckboxButton>({
    resolver: yupResolver(formDataChema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });
  const form = (
    <form className="checkboxAgreeForm" onSubmit={ handleSubmit(onSubmitDispatch) }>
      <div className="paymentAgreeForm__checkbox">
        <Controller
          name="checkboxButton"
          control={ control }
          render={ ({ field, fieldState: { error } }) =>
            (
              <Checkbox
                { ...field }
                id="checkboxButton"
                label={ checkboxTitle }
                errorMessage={ error?.message }
              />
            ) }
        />
      </div>
      <ButtonMain
        label="Send"
        className="checkboxAgreeForm__accept"
        type="submit"
      />
    </form>
  );
  return (
    <div className="checkboxButton__wrapper">
      { form }
    </div>
  );
};
