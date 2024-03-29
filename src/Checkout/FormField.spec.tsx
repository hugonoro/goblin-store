import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
    it('renders correctly', () => {
        const { getByLabelText } = renderWithFormHook(
            <FormField label="Foo label" name="foo"/>
        );
        const input = getByLabelText('Foo label:');
        expect(input).toBeInTheDocument();
        expect(input).not.toHaveClass('is-error');
        expect(input).toHaveAttribute('name', 'foo');
    });

    describe('with error', () => {
        it('renders error message', () => {
            const { getByText } = renderWithFormHook(
                <FormField
                    label="Foo Label"
                    name="foo"
                    errors={ { message: 'Example error' } }
                />
            );
            expect(getByText('Error: Example error')).toBeInTheDocument();
        });
    });

    describe('on change', () => {
        it('normalizes the input', () => {
            const { getByLabelText } = renderWithFormHook(
                <FormField
                    label="Foo Label"
                    name="foo"
                    errors={ { message: 'Example error' } }
                    normalize={ (value: string) => value.toUpperCase() }
                />
            );
            const input = getByLabelText('Foo Label:') as HTMLInputElement;
            fireEvent.change(input, { target: { value: 'test' } });

            expect(input.value).toEqual('TEST')
        });
    });
});
