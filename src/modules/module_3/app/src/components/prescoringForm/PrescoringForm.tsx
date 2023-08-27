import { ErrorMessage } from '@hookform/error-message';
import * as React from 'react';
import { useForm, Controller, SubmitHandler, UseFormRegister, FieldValues } from "react-hook-form"
import { Path } from 'react-hook-form';
import { Input } from '../input/Input';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Label } from '../label/Label';
import { object, string, date, InferType } from 'yup';
import {parse, format, subYears} from 'date-fns';
import { Select } from '../select/Select';
import { parseDateString } from '../../utils';
import { ButtonMain } from '../ui-toolkit/buttonMain/ButtonMain';
import { Slider } from '../ui-toolkit/slider/Slider';
import { Spinner } from '../spinner/Spinner';
import { postCustom } from '../../api';
import { json } from 'stream/consumers';

const formDataSchema = Yup.object({
    lastName: string().required('Enter your last name'),
    firstName: string().required('Enter your first name'),
    middleName: string().nullable().defined(),
    email: string().email('Enter the corect email').required('Enter your email'),
    birthdate: Yup.date()
    .transform(parseDateString)
    .required('Enter you birthday as dd.mm.yyyy')
    .typeError("Please enter a valid date")
    .max((format(subYears(new Date(),18), 'dd.MM.yyyy')), "Date is too early"),

    term: string().required(),
    passportNumber: Yup.number()
                    .required('Enter your password number')
                    .min(100000,'The series must be 6 digits')
                    .max(999999,'The series must be 6 digits'),
    passportSeries: Yup.number()
                    .required('Enter your password series')
                    .min(1000, 'The series must be 4 digits')
                    .max(9999, 'The series must be 4 digits'),
    amount: Yup.number()
            .min(15000, 'Amount must be more than 15000')
            .max(600000, 'Amount must be less than 600000')
            .required('Enter an valid amount')
            .typeError('Enter an valid amount  ')
})

type TFormData = InferType<typeof formDataSchema>

// export interface IFormInputs extends FieldValues {
//     amount: number,
//     term: number,
//     firstName: string,
//     lastName: string,
//     middleName: string | null,
//     email: string,
//     birthdate: string | Date,
//     passportSeries: string,
//     passportNumber: string
// }

export const PrescoringForm: React.FC = () => {
    const [isValidated, setIsValidated] = React.useState(false);
    const [amount, setAmount] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);

    const {handleSubmit, formState: { errors }, control} = useForm<TFormData>({
        resolver: yupResolver(formDataSchema),
        defaultValues: {
            middleName: '',
            term:'6 month',
            amount: 15000
        },
        mode:'onSubmit',
        reValidateMode:'onChange',
        shouldFocusError: true
    });

    const onSubmit: SubmitHandler<TFormData> = (data) => {
        console.log(data);
        console.log('data')
        imitateLoading();
        setAmount(data.amount);
        postCustom('/application', JSON.stringify(data))
    }

    const onValidAttempt = () => {
        setIsValidated(true);
        
    }

    const imitateLoading = () => {
        setIsLoading(true);
        setTimeout(()=> setIsLoading(false), 10000);
    }

    const form = (
        <form className='prescoring-form' onSubmit={handleSubmit(onSubmit)} id='prescoring-form'>
            <div className="prescoring-form__customize-card">
                <div className="prescoring-form__amount">
                    <p className="prescoring-form__title">
                        Customize your card
                    </p>
                    <p className="prescoring-form__step">
                        Step 1 of 5
                    </p>
                    <div className="prescoring-form__select-amount">
                        <p className="prescoring-form__step">
                            Select amount
                        </p>
                        <Controller 
                            name='amount'
                            control={control}
                            render={
                                ({field, fieldState: {invalid, error}}) =>
                                <Input
                                    type='number'
                                    errorMessage={error?.message}
                                    className='prescoring-form__amount-content'
                                    {...field} />
                            }
                        />
                        <Slider min={15000} max={600000} current={amount} />
                    </div>
                </div>
                <div className="prescoring-form__result">
                    <p className="prescoring-form__small-title">
                        You have chosen the amount
                    </p>
                    <p className="prescoring-form__amount-content">
                        {amount > 15000 && amount < 600000 ? amount : 'Incorrect amount'}
                    </p>
                </div>
            </div>

            <div className="prescoring-form__contact-info">
                <p className="prescoring-form__small-title">
                    Contact information
                </p>
                <div className="prescoring-form__inputs-wrapper">
                    <div className="prescoring-form__input-container">
                    <Label title='Your last name 'elementId='lastName' isRequired={true} />
                    <Controller 
                            name='lastName'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input 
                            placeholder='For Example Doe'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your first name 'elementId='firstName' isRequired={true} />
                        <Controller 
                            name='firstName'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input
                            placeholder='For Example Jhon'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your patronymic 'elementId='middleName' isRequired={false} />
                        <Controller 
                            name='middleName'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input
                            placeholder='For Example Victorovich'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Select term 'elementId='term' isRequired={true} />
                        <Controller 
                            name='term'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Select
                            values={['6 month', '12 month', '18 month', '24 month',]}
                            errorMessage={error?.message}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your email 'elementId='email' isRequired={false} />
                        <Controller 
                            name='email'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input
                            placeholder='test@gmail.com'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your date of birth 'elementId='birthdate' isRequired={true} />
                        <Controller 
                            name='birthdate'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input    
                            placeholder='Select date and Time'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your passport series 'elementId='passportSeries' isRequired={true} />
                        <Controller 
                            name='passportSeries'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input
                            type='number'
                            placeholder='0000'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                    <div className="prescoring-form__input-container">
                        <Label title='Your passport number 'elementId='passportNumber' isRequired={true} />
                        <Controller 
                            name='passportNumber'
                            control={control}
                            render={({field, fieldState: {
                                invalid,
                                error
                            }})=> <Input
                            type='number'
                            placeholder='000000'
                            errorMessage={error?.message}
                            isInvalid={invalid}
                            isValidated={isValidated}
                            {...field} />}
                        />
                    </div>
                   
                </div>
            </div>
            <ButtonMain 
                label='Continue' 
                className='prescoring-form__submit'
                formAction='submit'
                onClick={() => {onValidAttempt(); handleSubmit((onSubmit))();}} />
        </form>
    )

    return (
        <>
            {isLoading ? <Spinner /> : form}
        </>
    )
}