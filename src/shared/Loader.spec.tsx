import { render } from '@testing-library/react';
import React from 'react';
import { Loader } from './Loader';

describe('Loader', () => {
    it('renders correctly', () => {
        const { container } = render(<Loader/>);
        expect(container.innerHTML).toMatch('Loading');
    });
});
