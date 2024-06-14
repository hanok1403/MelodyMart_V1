import express from 'express';
import orderModel from '../models/OrderModel.js';
import productModel from '../models/ProductModel.js';
import userModel from '../models/UserModel.js';

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
    const userData = req.body.token;
    const itemId = req.params.id;
    // console.log(req.body)

    // const productDetails = await productModel.find({productId:itemId})
    // console.log(productDetails)
    const updatedUser = await userModel.findByIdAndUpdate(userData,{
        $push: {cart: itemId},
        },{new: true}
    )
    res.json({ message: 'Item added to cart successfully', userData, itemId })
    }
)

export default router;