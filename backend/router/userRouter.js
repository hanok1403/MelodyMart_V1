import express from 'express';
import cartModel from '../models/CartModel.js';
import orderModel from '../models/OrderModel.js';
import productModel from '../models/ProductModel.js';
import userModel from '../models/UserModel.js';
import mail from './sendmail.js';
const router = express.Router()
router.use(express.urlencoded({extended:true}))
router.use(express.json());

router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const userDetails = await userModel.findById(userId);
      if (!userDetails) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(userDetails);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching user details', error: err.message });
    }
  });

  router.post('/forgotPassword/', async (req, res) => {
    const {email}= req.body;
    try{
        const userDetails= await userModel.findOne({email:email});
        if(!userDetails)
            return res.status(404).json({message:'User not found'});
        res.status(200).json(userDetails);
    }catch(err){
        res.status(500).json({message:'Error fetching user details',error: err.message});
    }
  });

  router.put('/users/:id', async(req,res)=>{
      const userId= req.params.id;
      const updatedPassword= req.body.password;
      try{
          const updatedUser= await userModel.findByIdAndUpdate(
              userId,
              {password:updatedPassword},
              {new:true}
          );
  
          if(!updatedUser){
              return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(updatedUser);
      }catch (err) {
          res.status(500).send({ message: 'Error updating user', error: err.message });
      }
  });

  router.get('/getProduct/:id', async (req, res)=>{
    const productId = req.params.id;

    const data = await productModel.find({productId:productId})

    if(data){
        res.status(200).json(data)
    }
    else{
        res.status(404).json({message: 'Product not found'})
    }

  })
  router.put('/cart/setProductQuantity/:id', async (req, res)=>{
    const productId = req.params.id;
    const quantity = (req.body.quantity)?req.body.quantity:1;

   
    const user = req.body.userId;
    const data = await cartModel.findOne({userId:user, productId:productId})
    if(data){
        data.quantity = quantity
        await data.save()
        res.status(200).json({message: 'Product quantity updated successfully'})
    }
    else{
        res.status(404).json({message: 'Product not found'})
    }
  })

  router.put('/users/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, mobileNumber } = req.body; 
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                username: username,
                mobileNumber: mobileNumber
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send({ message: 'Error updating user', error: err.message });
    }
});




router.get('/home', async (req, res)=>{
    try {
        const data = await productModel.find({});
        // // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
    }
})

router.post('/home/:id', async (req, res)=>{
    // // console.log(req.body)
    try {
        const userData = JSON.parse(req.body.user);
        const itemId = req.params.id;
        // // console.log(req.body)
        const userId = userData.user.id;
        const quantity = req.body.quantity;

        const productDetails = await productModel.findOne({ productId: itemId });

        if (!productDetails) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingCartItem = await cartModel.findOne({ userId:userId, productId: itemId });
        // // console.log("existing cart: " + existingCartItem)
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
        // // console.log(cart)
        res.json({ message: 'Item added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
})

router.get('/cart/:id', async (req, res)=>{
    try{
        const userId = req.params.id;
        // // console.log("back " + userId)

        const cartData = await cartModel.find({ userId: userId });
        // // console.log(cartData)

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
      
    //   // console.log(`Item ID: ${itemId}, User ID: ${userId}`);
  
        const cartItem = await cartModel.findOneAndDelete({ userId: userId, productId: itemId });
        
      const updatedCart = await cartModel.find({ userId: userId });
    //   // console.log(updatedCart)
  
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Error while removing items from the cart', error });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const userId = req.body.userId;
        const userName = req.body.userName;
        const address = req.body.address;
        const paymentType = req.body.paymentType;

        const cartData = await cartModel.find({ userId: userId });
        // const userData= await userModel.find({userId: userId});
        const userData= await userModel.findById(userId);
        console.log(userData, userData.email);
        
        const totalCost = cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

        const emaildata = {
            email: userData.email,
            cost: totalCost
        }
        const orderData = {
            userId: userId,
            orderDate: new Date(),
            userName:userName,
            cartData:cartData,
            address: address,
            paymentType: paymentType,
            totalPrice: totalCost
        };

        // console.log(orderData)

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
            await mail(emaildata).catch(console.error);
            console.log(emaildata);
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

router.post('/orders/cancel/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId  = req.body.userId;
  
        // console.log(orderId + " " + userId)
      const order = await orderModel.findOne({ _id: orderId, userId });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = 'Cancelled';
      await order.save();

      const prevItems = order.cartData;
    //   console.log(prevItems)
    //   console.log('______________________')
      for (let item of prevItems) {
        const product = await productModel.findOne({productId:item.productId});
        if (product) {
            await productModel.findByIdAndUpdate(item.productId, {
                quantity: product.quantity + item.quantity
            });
        }
        else{
            const deletedNewProduct = {
                _id:item.productId,
                productId: item.productId,
                imageUrl: item.imageUrl,
                productName: item.productName,
                price:item.price,
                description:description,
                quantity: item.quantity
            }
            // console.log('deleted product' + deletedNewProduct)
            await productModel.create(deletedNewProduct);
        }
      }

  
      const updatedOrders = await orderModel.find({ userId });
      
      res.status(200).json(updatedOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling order', error });
    }
  });
  
export default router;