import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
        content: {
            type: String,
            required: true
        },
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price : {
            type: Number,
            required: true
        },
        comments : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comments'
        }],
        image : {
            type: String,
            required: [true, "image is required"]
        }
    },{
        timestamps: true
    })

export default mongoose.model("Product", productSchema)