import React from 'react';
import { Link } from 'react-router-dom';
import cart from './cart.svg';
import { useCartContext } from '../../CartContext';

interface CartWidgetProps {
    useCartHook?: () => Pick<ReturnType<typeof useCartContext>, 'products'>;
}

export const CartWidget = ({ useCartHook = useCartContext }: CartWidgetProps) => {
    const { products } = useCartHook();

    return (
        <Link to="/cart" className="nes-badge is-icon">
            <span className="is-error">{ products?.length || 0 }</span>
            <img src={ cart } width="64" height="64" alt="cart"/>
        </Link>
    );
};
