import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormError {
    message: string;
}

interface FormFieldProps
    extends React.HTMLProps<HTMLInputElement> {
    label: string;
    errors?: FormError;
    normalize?: (value: string) => string;
}

export const FormField = ({
                              label,
                              name,
                              errors,
                              normalize = (value) => value,
                              ...inputProps
                          }: FormFieldProps) => {

    const { register } = useFormContext();

    return (
        <div className="nes-field">
            <label id={ `${ name }-label` } htmlFor={ name }>
                { label }:
            </label>
            <input
                aria-labelledby={ `${ name }-label` }
                { ...register(name as string, {
                    onChange: (e) => {
                        ( e.target.value = normalize(e.target.value) );
                    }
                }) }
                { ...inputProps }
                className={ `nes-input ${ errors && 'is-error' }` }
            />
            { errors && (
                <p className="note nes-text is-error">
                    Error: { errors.message }
                </p>
            ) }
        </div>
    );
};
