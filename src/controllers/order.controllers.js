import Users from "../models/user.models.js"
import Product from "../models/user.products.js"
import Order from "../models/user.order.js"




const orderCreate = async (req,res)=>{
    const {id,quantity} = req.body
    const userId = req.user.id;
    const user = await Users.findById(userId)
    if(!user) return res.status(404).json({message:"User not found"})
     if (user.role !== "customer") {
            return res.status(403).json({ message: "Unauthorized: Only customers can place orders" });
    }
    const product = await Product.findById(id)
    if(!product) return res.status(404).json({message:"Product not found"})

    const totalPrice = product.price * quantity
    const order = await Order.create({
        user: userId,
        product: [id],
        quantity,
        totalPrice,
        status: "Order Done"
    })
    
    await user.save()
    await user.updateOne({
        $push: {orders: order._id}
    })

    const productOwner = await Users.findById(product.user); 
    if (productOwner) {
        await productOwner.updateOne({
            $push: { orders: order._id }
        });
    }


    res.status(200).json({
        message:"Order created successfully",
        order
    })


}

export {orderCreate}