import * as React from 'react';
import { Path, UseFormRegister, FieldValues } from 'react-hook-form';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string,
    defaultValue?: string,
}

export const InputText= React.forwardRef<HTMLInputElement, IInputProps>(({title, id, placeholder, value='', onChange}, ref) => {
    return (
        <div className='input-text'>
            <label className='input-text__label' htmlFor={id}>{title}</label>
            <input className='input-text__field' type='text' placeholder={placeholder} id={id} name={id} onChange={()=> console.log('kekew')}/>
        </div>
    )
});

// import React, { forwardRef, HTMLInputTypeAttribute } from "react";


// interface InputProps {
//   name: string;
//   value: string;
//   label?: string;
//   placeholder?: string;
//   type?: HTMLInputTypeAttribute;
//   isInvalid?: boolean;
//   errorMessage?: string;
//   onChange: (value: string) => void;
// }

// export const InputText = forwardRef<HTMLInputElement, InputProps>(({
//   name,
//   value,
//   label,
//   placeholder,
//   type = "text",
//   isInvalid,
//   errorMessage,
//   onChange,
// }, ref) => (
//   <div>
//     { label && <label htmlFor={ name }>{ label }</label> }
//     <input
//       ref={ ref }
//       id={ name }
//       name={ name }
//       placeholder={ placeholder }
//       type={ type }
//       value={ value }
//       style={{ backgroundColor: isInvalid ? "red" : "white" }}
//       onChange={ (e) => onChange(e.target.value) }
//     />

//     { errorMessage && (
//       <div>
//         { errorMessage }
//       </div>
//     ) }
//   </div>
// ));

// InputText.displayName = "Input";