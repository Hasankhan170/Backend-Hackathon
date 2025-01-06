import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        price : {
            type: Number,
            required: true
        },
        image : {
            type: String,
            required: [true, "image is required"]
        }
    },{
        timestamps: true
    })

export default mongoose.model("Product", productSchema)