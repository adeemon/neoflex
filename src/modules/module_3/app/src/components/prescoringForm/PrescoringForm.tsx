import { ErrorMessage } from '@hookform/error-message';
import * as React from 'react';
import { useForm, Controller, SubmitHandler, UseFormRegister, FieldValues } from "react-hook-form"
import { Path } from 'react-hook-form';
import { InputText } from '../inputText/InputText';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export interface IFormInputs extends FieldValues {
    username: string,
}

interface IInputProps {
    title: string,
    id: string,
    placeholder?: string,
    defaultValue?: string,

}

// const InputText = ({label, register, required}: TInputProps) => {
//     return (
//         <div className='input-text'>
//             <label className='input-text__label' htmlFor={id}>{title}</label>
//             <input className='input-text__field' type='text' placeholder={placeholder} id={id} name={title}>{defaultValue}</input>
//         </div>
//     )
// }
const Input = ({ label, register, required }: IFormInputs) => (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} />
    </>
  )
  



export const PrescoringForm: React.FC = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
    })


    const {handleSubmit, formState: { errors }, control, reset, register} = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            username: 'Vova'
        }
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        console.log('submit')
    }

    return (
        <form className='prescoring-form' onSubmit={handleSubmit(onSubmit)}>
            <Controller 
                name='username'
                control={control}
                render={({field})=> <InputText  {...field} />}
            />
            <input type='submit' /> 
        </form>
    )
}

// return (
//     <form className='prescoring-form' onSubmit={handleSubmit(onSubmit)}>
//         <Input label='name' register={register} required/>
//         <ErrorMessage  errors={errors} name="singleErrorInput" />
  
//   <ErrorMessage
//     errors={errors}
//     name="singleErrorInput"
//     render={({ message }) => <p>{message}</p>}
//   />
//         <input type='submit' /> 
//     </form>
// )