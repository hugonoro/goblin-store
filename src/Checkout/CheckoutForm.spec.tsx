import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { CheckoutForm } from './CheckoutForm';

describe('CheckoutForm', () => {
    it('renders correctly', () => {
        const { container } = render(<CheckoutForm/>);

        expect(container.innerHTML).toMatch('Cardholders Name');
        expect(container.innerHTML).toMatch('Card Number');
        expect(container.innerHTML).toMatch('Expiration Date');
        expect(container.innerHTML).toMatch('CVV');
    });

    describe('with invalid inputs', () => {
        it('shows errors', async () => {
            const { container, getByText } = render(<CheckoutForm/>);
            await act(async () => {
                fireEvent.click(getByText('Place order'));
            });
            expect(container.innerHTML).toMatch('Error:');
        });
    });

    describe('with valid inputs', () => {
        describe('on place order button click', () => {
            it('calls submit function with form data', async () => {
                const mockSubmit = jest.fn();
                const { getByLabelText, getByText } = render(
                    <CheckoutForm submit={ mockSubmit }/>
                );
                await act(async () => {
                    fireEvent.change(
                        getByLabelText('Cardholders Name:') as HTMLInputElement,
                        { target: { value: 'Bibo Bobbins' } }
                    );
                    fireEvent.change(
                        getByLabelText('Card Number:'),
                        { target: { value: '0000 0000 0000 0000' } }
                    );
                    fireEvent.change(
                        getByLabelText('Expiration Date:'),
                        { target: { value: '3020-05' } }
                    );
                    fireEvent.change(
                        getByLabelText('CVV:'),
                        { target: { value: '123' } }
                    );
                });
                await act(async () => {
                    fireEvent.click(getByText('Place order'));
                });

                expect(mockSubmit).toHaveBeenCalled();
            });
        });
    });
});
