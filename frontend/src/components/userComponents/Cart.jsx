import React, { useState } from 'react';
import CartItem from './CartItem';

function Cart() {
    const [cartItems, setCartItems] = useState([
        { productId: 1, productName: 'Veena', description: 'Indian Music Instrument', price: 10000, quantity: 1, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Saraswati_veena_%28Indian_long-necked_lute%29.png' },
        { productId: 2, productName: 'Piano', description: 'Good', price: 20, quantity: 2, imageUrl: 'https://pngimg.com/uploads/piano/piano_PNG10879.png' },
    ]);

    const handleIncrement = (id) => {
        setCartItems(cartItems.map(item => 
            item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrement = (id) => {
        setCartItems(cartItems.map(item => 
            item.productId === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    return (
        <div className="cart">
            {cartItems.map(item => (
                <CartItem
                    key={item.productId}
                    product={item}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
            ))}
        </div>
    );
}

export default Cart;
