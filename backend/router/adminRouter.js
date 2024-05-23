import express from 'express'
import productModel from '../models/ProductModel.js'
import orderModel from '../models/OrderModel.js';

const router = express.Router()
router.use(express.urlencoded({extended:true}))
router.use(express.json()); 


router.get('/',async (req, res)=>{
    try {
        const data = await productModel.find({});
        // console.log(data)
        res.json(data);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
    }
})

router.post('/addProduct',async (req, res)=>{
    try {
        const product = req.body;
        const prod = await productModel.create(product);
        res.status(201).send("Product added");
    } catch (error) {
        res.status(400).json({ message: "Unable to add the product", error });
    }
})

router.get('/delete/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if (product) {
            res.status(200).json("Product deleted");
        }
        else
            res.status(500).json({ message: "Error deleting product", error });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
})

router.get('/productEdit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching product details", error });
    }
});


router.post('/productEdit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const product = await productModel.findByIdAndUpdate(id, updates, { new: true });
        if (product) {
            res.status(200).send("Product updated");
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error });
    }
});


router.get('/orders', async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

export default router;