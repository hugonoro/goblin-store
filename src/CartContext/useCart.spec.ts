import { act, renderHook } from '@testing-library/react-hooks';
import { Product } from '../shared/types';
import { useCart } from './useCart';

const localStorageMock = ( () => {
    let store: { [key: string]: string } = {};
    return {
        clear: () => {
            store = {};
        },
        getItem: (key: string) => {
            return store[key] || null;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        setItem: (key: string, value: string) => {
            store[key] = value ? value.toString() : '';
        }
    };
} )();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('useCart', () => {
    beforeEach(() => {
        localStorageMock.setItem = jest.fn(localStorageMock.setItem);
    });
    afterEach(() => {
        localStorageMock.clear();
    });

    describe('on mount', () => {
        it('loads data from localStorage', () => {
            const products: Product[] = [
                {
                    name: 'Product foo',
                    price: 0,
                    image: 'image.jpg'
                }
            ];
            localStorageMock.setItem(
                'products',
                JSON.stringify(products)
            );

            const { result } = renderHook(useCart);

            expect(result.current.products).toEqual(products);
        });
    });

    describe('#addToCart', () => {
        it('adds item to the cart', () => {
            const product: Product = {
                name: 'Product foo',
                price: 0,
                image: 'image.jpg'
            };
            const { result } = renderHook(useCart);

            act(() => {
                result.current.addToCart(product);
            });

            expect(result.current.products).toEqual([product]);
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'products',
                JSON.stringify([product])
            );
        });
    });

    describe('#removeFromCart', () => {
        it('removes item from the cart', () => {
            const product: Product = {
                name: 'Product foo',
                price: 0,
                image: 'image.jpg'
            };
            localStorageMock.setItem(
                'products',
                JSON.stringify([product])
            );
            const { result } = renderHook(useCart);

            act(() => {
                result.current.removeFromCart(product);
            });

            expect(result.current.products).toEqual([]);
            expect(localStorageMock.setItem).toHaveBeenCalledWith('products', '[]');
        });
    });

    describe('#totalPrice', () => {
        it('returns total products price', () => {
            const product: Product = {
                name: 'Product foo',
                price: 21,
                image: 'image.jpg'
            };
            localStorageMock.setItem('products', JSON.stringify([product, product]));
            const { result } = renderHook(useCart);

            expect(result.current.totalPrice()).toEqual(42);
        });
    });

    describe('#clearCart', () => {
        it('removes all the products from the cart', () => {
            const product: Product = {
                name: 'Product foo',
                price: 21,
                image: 'image.jpg'
            };
            localStorageMock.setItem('products', JSON.stringify([product, product]));
            const { result } = renderHook(useCart);

            act(() => {
                result.current.clearCart();
            });

            expect(result.current.products).toEqual([]);
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'products',
                '[]'
            );
        });
    });
});
