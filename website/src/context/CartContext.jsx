import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const initialCart = [
    {
        id: 6,
        name: 'Grind Vessel',
        category: 'Navy Blue',
        price: 65.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80'
    }
];

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(initialCart);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === product.id || item.name === product.name);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + 1
                };
                return updated;
            } else {
                const numericPrice = typeof product.price === 'string'
                    ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
                    : (product.price || 0);

                return [
                    ...prev,
                    {
                        id: product.id || Date.now(),
                        name: product.name,
                        category: product.category || 'Standard',
                        price: numericPrice,
                        quantity: 1,
                        image: product.image
                    }
                ];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const setExactQuantity = (id, newQty) => {
        const qty = Math.max(1, parseInt(newQty, 10) || 1);
        setCartItems(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity: qty } : item))
        );
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    const cartQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartQty,
            subtotal,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            setExactQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
