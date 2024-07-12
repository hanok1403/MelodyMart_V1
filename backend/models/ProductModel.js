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
    },
    category:{
        type: String,
        required: true
    }
})

productSchema.pre('save', function(next) {
    if (!this.productId) {
        this.productId = this._id.toString();
    }
    next();
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;