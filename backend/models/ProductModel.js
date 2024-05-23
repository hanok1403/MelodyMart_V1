import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    productId:{
        type: String,
        // required: true,
        unique: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    productName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
})

productSchema.pre('save', function(next) {
    if (!this.productId) {
        this.productId = this._id.toString();
        // console.log(`productId set to ${this.productId}`);
    }
    next();
});

const productModel = mongoose.model('Products', productSchema);

export default productModel;