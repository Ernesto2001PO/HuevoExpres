import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Lógica de ejemplo. Reemplázala con tu lógica real.
    const [cart, setCart] = useState({ totalItems: 3, items: [] });

    const addToCart = () => { /* tu lógica para añadir al carrito */ };
    const removeFromCart = () => { /* tu lógica para remover del carrito */ };

    const value = { cart, addToCart, removeFromCart };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
