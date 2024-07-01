import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

// function Cart() {
//     const [cartItems, setCartItems] = useState([
//         { productId: 1, productName: 'Veena', description: 'Indian Music Instrument', price: 10000, quantity: 1, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Saraswati_veena_%28Indian_long-necked_lute%29.png' },
//         { productId: 2, productName: 'Piano', description: 'Good', price: 20, quantity: 2, imageUrl: 'https://pngimg.com/uploads/piano/piano_PNG10879.png' },
//     ]);

//     const handleIncrement = (id) => {
//         setCartItems(cartItems.map(item => 
//             item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
//         ));
//     };

//     const handleDecrement = (id) => {
//         setCartItems(cartItems.map(item => 
//             item.productId === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
//         ));
//     };

//     return (
//         <div className="cart">
//             {cartItems.map(item => (
//                 <CartItem
//                     key={item.productId}
//                     product={item}
//                     onIncrement={handleIncrement}
//                     onDecrement={handleDecrement}
//                 />
//             ))}
//         </div>
//     );
// }

// export default Cart;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // console.log(user.user.id)
      if (user) {
          fetch(`http://localhost:5000/cart/${user.user.id}`)
              .then(response => response.json())
              .then(data => setCart(data))
              .catch(error => console.log(error));
      }
      // console.log(cart)
  }, []);
  
    const handleRemoveItem = (productId) => {
      setCart(cart.filter(item => item.productId !== productId));
    };
  
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        {cart.map(item => (
          <CartItem key={item.productId} item={item} onRemove={handleRemoveItem} />
        ))}
        <div className="cart-total">
          <h3>
            Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </h3>
        </div>
      </div>
    );
  };
  
  export default Cart;