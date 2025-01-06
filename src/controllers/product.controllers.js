import Users from "../models/user.models.js"
import Product from "../models/user.products.js"
// import Stripe from 'stripe';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary img 
const uploadImgToCloudinary = async (filePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    console.log("Cloudinary Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log(process.env.CLOUDINARY_API_KEY);
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          resource_type: "auto",
        });
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;
      } catch (error) {
        fs.unlinkSync(filePath);
        return null;
      }
};

const createPost = async (req, res) => {
    const { name, description, price} = req.body;
    if (!name) return res.status(400).json({ message: "Please enter a name" });
    if (!price) return res.status(400).json({ message: "Please enter a price" });
    if (!description) return res.status(400).json({ message: "Please enter a description" });
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const userId = req.user.id; 
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized: Only admin can create a product" });
    }

    try {
        const imageUrl = await uploadImgToCloudinary(req.file.path);
        const newPost = await Product.create({
            name,
            price,
            description,
            image: imageUrl,
            user: user._id
        });

        if (user.role === 'admin') {
            await user.updateOne({
                $push: { products: newPost._id }
            });
        }

        const updatedUser = await Users.findById(userId).populate("products");
        res.status(200).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const singleUserPost = async (req, res)=>{
    const {id} = req.params;
    const user = await Users.findById(id).populate("products");
    if(!user) return res.status(404).json({message : "User not found"})
    res.status(200).json({
        message : "post found",
        user
    })
}

const getAllUsers = async (req,res)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page -1) * limit
    try {
        const product = await Product.find({}).skip(skip).limit(limit)
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            message: "products found successfully",
            product,
            length: product.length,
            page,
            limit,
        })

    } catch (error) {
        console.log(error);
        
    }
}

const deleteSinglePost = async (req,res)=>{
    const {userId, productId} = req.params;
    const user = await Users.findById(userId)
    if(!user) return res.status(404).json({message : "User not found"})
    
    const postDelete = await Product.findByIdAndDelete(productId)
    if(!postDelete) return res.status(404).json({message : "Product not found"})
    // /Pull MongoDB ka ek update operator hai jo kisi array se ek specific value ko nikalne ke liye use hota hai
    await user.updateOne({
        $pull : {products : productId}
    })

    const updatedUser = await Users.findById(userId).populate("products");
    res.status(200).json({
        message: "Product deleted successfully",
        user: postDelete
    })
}

const editSinglePost = async (req,res)=>{
    const {userId,productId} = req.params
    const {name, price, description} = req.body;
    if (!name && !price && !description) {
        return res.status(400).json({ message: "Please provide at least one field to update" });
    }

    const user= await Users.findById(userId)
    if(!user) return res.status(404).json({message : "User not found"})
    const editProduct = await Product.findByIdAndUpdate(productId,req.body) 
    if(!editProduct) return res.status(404).json({message : "Product not found"})
    
    const updatePorduct = await Product.findById(productId)
    res.status(200).json({
        message: "Product updated successfully",
        user: updatePorduct
    })
}

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
// const ProductPayment = async (req, res) => {
//     const { userId } = req.params;
//     const { productId } = req.body;

//     try {
//         const user = await Users.findById(userId, "products");
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         if (!user.products.includes(productId)) {
//             return res.status(404).json({ message: 'Product not found in user\'s products' });
//         }

//         const product = await Product.findById(productId);
//         if (!product) return res.status(404).json({ message: 'Product not found' });

//         const totalAmount = product.price * product.quantity;

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [{
//             price_data: {
//             currency: 'usd',
//             product_data: {
//             name: product.content,
//             },
//             unit_amount: totalAmount * 100, 
//             },
//             quantity: 1,
//             }],
//             mode: 'payment',
//             success_url: "http://localhost:5173/success",
//             cancel_url: "http://localhost:5173/cancel",
//         });

//         res.json({
//             message: "Session created successfully",
//             sessionId: session.id,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Payment creation failed', error });
//     }
// };


export {createPost,singleUserPost,getAllUsers,deleteSinglePost,editSinglePost}