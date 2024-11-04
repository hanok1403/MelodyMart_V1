import express from 'express';
import orderModel from '../models/OrderModel.js';
import productModel from '../models/ProductModel.js';
import UserModel from '../models/UserModel.js';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const data = await productModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error });
    }
});

router.post('/addProduct', async (req, res) => {
    try {
        const product = req.body;
        const prod = await productModel.create(product);
        res.status(201).send("Product added");
    } catch (error) {
        res.status(400).json({ message: "Unable to add the product", error });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if (product) {
            res.status(200).json("Product deleted");
        } else {
            res.status(500).json({ message: "Error deleting product", error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

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

router.put('/productEdit/:id', async (req, res) => {
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

router.get('/customers', async (req, res) => {
    try {
        const users = await UserModel.find({role:'user'}).select('username email mobileNumber role');

        
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
});

router.put('/orders/cancel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
        if (order) {

            const prevItems = order.cartData;
            console.log(prevItems)
            console.log('______________________');
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
                    console.log('deleted product' + deletedNewProduct)
                    await productModel.create(deletedNewProduct);
                }
            }


            res.status(200).json(order);

        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating order status", error });
    }
});

router.put('/orders/shipped/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndUpdate(id, { status: 'Shipped' }, { new: true });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating order status", error });
    }
});

router.put('/orders/complete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findByIdAndUpdate(id, { status: 'Completed' },{ new: true });
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).send("Order not found");
        }
    } catch (error) {
        res.status(400).json({ message: "Error updating order status", error });
    }
});

export default router;
