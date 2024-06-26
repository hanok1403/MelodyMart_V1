import express from 'express';
import orderModel from '../models/OrderModel.js';
import productModel from '../models/ProductModel.js';
import userModel from '../models/UserModel.js';
import cartModel from '../models/CartModel.js';

const router = express.Router()
router.use(express.urlencoded({extended:true}))
router.use(express.json()); 

router.get('/home', async (req, res)=>{
    try {
        const data = await productModel.find({});
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
    }
})

router.post('/home/:id', async (req, res)=>{
    // console.log(req.body)
    try {
        const userData = JSON.parse(req.body.user);
        const itemId = req.params.id;
        // console.log(req.body)
        const userId = userData.user.id;
        const quantity = req.body.quantity;

        const productDetails = await productModel.findOne({ productId: itemId });

        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingCartItem = await cartModel.findOne({ userId:userId, productId: itemId });
        // console.log("existing cart: " + existingCartItem)
        let cart;
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.price = productDetails.price;
            cart = await existingCartItem.save();
        } else {
            cart = await cartModel.create({
                userId:userId,
                imageUrl:productDetails.imageUrl,
                productId: itemId,
                quantity: quantity,
                price: productDetails.price
            });
        }
        // console.log(cart)
        res.json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
})

router.get('/cart/:id', async (req, res)=>{
    try{
        const userId = req.params.id;
        // console.log("back " + userId)

        const cartData = await cartModel.find({ userId: userId });
        // console.log(cartData)

        res.json(cartData);

    } catch (error) {
        res.status(500).json({ message: 'Error getting items from the cart', error });
    }
})

router.delete('/cart/itemDelete/:id', async (req, res) => {
    try {
      const { id: itemId } = req.params;
      const  userId  = req.body.userId;
  
    //   const userId = user
      
      console.log(`Item ID: ${itemId}, User ID: ${userId}`);
  
        const cartItem = await cartModel.findOneAndDelete({ userId: userId, productId: itemId });

    //   console.log(cartItem)  

    //   if (!cart) {
    //     return res.status(404).json({ message: 'Cart not found' });
    //   }
  
      // Remove the item from the cart
    //   cart.items = cart.items.filter(item => item.productId !== itemId);
    //   await cart.save();
  
      // Fetch the updated cart data for the user
      const updatedCart = await cartModel.find({ userId: userId });
    //   console.log(updatedCart)
  
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Error while removing items from the cart', error });
    }
  });

export default router;