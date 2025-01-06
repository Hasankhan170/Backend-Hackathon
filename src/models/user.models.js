import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        default: 'customer' 
    },
    products :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }],
    orders: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order'
    }]},{
        timestamps: true
    })

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

export default mongoose.model("Users", userSchema)