import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }],
        totalPrice: {
            type: Number,
            required: true
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        status : {
            type: String,
            default: 'pending'
        }
    })

export default mongoose.model('Order', orderSchema);