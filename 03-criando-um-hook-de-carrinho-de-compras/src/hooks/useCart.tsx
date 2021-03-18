import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    productId: number;
    amount: number;
}

interface CartContextData {
    cart: Product[];
    addProduct: (productId: number) => Promise<void>;
    removeProduct: (productId: number) => void;
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const [cart, setCart] = useState<Product[]>(() => {
        const storagedCart = localStorage.getItem('@RocketShoes:cart');

        if (storagedCart) {
            return JSON.parse(storagedCart);
        }

        return [];
    });

    const addProduct = async (productId: number) => {
        try {
            let newCart = [...cart];
            let product = newCart.find(product => product.id === productId);

            if (!product) {
                product = (await api.get<Product>(`/products/${productId}`)).data;
                if (!product) throw new Error('Produto não encontrado');

                product.amount = 0;
                newCart.push(product);
            }

            const stock = (await api.get<Stock>(`/stock/${productId}`)).data;
            if (!stock) throw new Error('Estoque não encontrado');

            if (product.amount + 1 > stock.amount) {
                toast.error('Quantidade solicitada fora de estoque');
                return;
            }

            newCart = newCart.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        amount: product.amount + 1
                    };
                }
                return product;
            });

            setCart(newCart);
            localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
        } catch {
            toast.error('Erro na adição do produto');
        }
    };

    const removeProduct = (productId: number) => {
        try {
            const newCart = cart.filter(product => product.id !== productId);

            if (cart.length === newCart.length) {
                throw new Error('Produto não encontrado');
            }

            setCart(newCart);
            localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
        } catch {
            toast.error('Erro na remoção do produto');
        }
    };

    const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {
        try {
            if (amount <= 0) return;

            const product = cart.find(product => product.id === productId);
            if (!product) throw new Error('Produto não encontrado');

            const stock = (await api.get<Stock>(`/stock/${productId}`)).data;
            if (!stock) throw new Error('Estoque não encontrado');

            if (amount > stock.amount) {
                toast.error('Quantidade solicitada fora de estoque');
                return;
            }

            const newCart = cart.map(product => {
                if (product.id === productId) {
                    return {
                        ...product,
                        amount
                    };
                }
                return product;
            });

            setCart(newCart);
            localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
        } catch {
            toast.error('Erro na alteração de quantidade do produto');
        }
    };

    return (
        <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProductAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextData {
    const context = useContext(CartContext);

    return context;
}
