import express from 'express'
import dotenv from "dotenv";
import connectDB from './src/db/index.js'
import cors from 'cors'
// import cookieParser from 'cookie-parser';
import userRoute from "./src/routes/user.route.js"
import postRouter from "./src/routes/products.route.js"
import orderRouter from "./src/routes/order.route.js"
// import { swaggerSpec, swaggerUi } from './src/swagger.js';





dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())
// app.use(cookieParser())


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//   customCss: '.swagger-ui .topbar { display: none }', // Customize UI if needed
//   customSiteTitle: 'My API Documentation',
//   swaggerOptions: {
//     authAction: {
//       Bearer: {
//         name: 'Bearer',
//         schema: {
//           type: 'apiKey',
//           in: 'header',
//           name: 'Authorization',
//           description: 'Enter your JWT token in the format `Bearer <token>`',
//         },
//         value: 'Bearer <your-token>', // You can initialize it with a default value (optional)
//       },
//     },
//   },
// }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", userRoute);
app.use("/products", postRouter);
app.use("/orders", orderRouter);




connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
      });
})
.catch((err)=>{
    console.log("MONGO DB connection failed !!! ", err);
})