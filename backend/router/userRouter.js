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
        // console.log()
        const userId = userData.user.id;

        const productDetails = await productModel.findOne({ productId: itemId });

        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingCartItem = await cartModel.findOne({ userId:userId, productId: itemId });
        // console.log("existing cart: " + existingCartItem)
        let cart;
        if (existingCartItem) {
            existingCartItem.quantity += 1;
            existingCartItem.price = productDetails.price;
            cart = await existingCartItem.save();
        } else {
            cart = await cartModel.create({
                userId:userId,
                productId: itemId,
                quantity: 1,
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
        console.log("back " + userId)

        const cartData = await cartModel.find({ userId: userId });
        console.log(cartData)

        res.json(cartData);

    } catch (error) {
        res.status(500).json({ message: 'Error getting items from the cart', error });
    }
})

export default router;