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
                productName:productDetails.productName,
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
      
    //   console.log(`Item ID: ${itemId}, User ID: ${userId}`);
  
        const cartItem = await cartModel.findOneAndDelete({ userId: userId, productId: itemId });
        
      const updatedCart = await cartModel.find({ userId: userId });
    //   console.log(updatedCart)
  
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Error while removing items from the cart', error });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const userId = req.body.userId;
        const address = req.body.address;
        const paymentType = req.body.paymentType;

        const cartData = await cartModel.find({ userId: userId });

        const totalCost = cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

        const orderData = {
            userId: userId,
            orderDate: new Date(),
            address: address,
            paymentType: paymentType,
            totalPrice: totalCost
        };

        await orderModel.create(orderData);

        const orders = await orderModel.find({ userId: userId });

        if (orders) {
            // Update quantities in the product inventory
            for (let item of cartData) {
                const product = await productModel.findById(item.productId);
                if (product) {
                    await productModel.findByIdAndUpdate(item.productId, {
                        quantity: product.quantity - item.quantity
                    });
                }
            }

            await cartModel.deleteMany({ userId: userId });

            res.status(200).json(orders);
        }

    } catch (error) {
        res.status(500).json({ message: 'Error while ordering', error });
    }
});


router.get('/orders/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await orderModel.find({ userId: userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
});
  

export default router;