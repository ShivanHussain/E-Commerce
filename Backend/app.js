import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';
import cors from 'cors';
import { connection } from './database/connection.js';
import { errorMiddleware } from './middleware/error.js';
import Cloudinary from './cloudinary/cloudinary.js';
import fileUpload from 'express-fileupload';
import productRoute from './routes/productRoutes.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js'



const app = express();
dotenv.config({path:'./config/config.env'});




const port = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());




app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


//API
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/cart",cartRoute);
app.use("/api/v1/order",orderRoute);
app.use("/api/v1/contact",contactRouter);





connection();

Cloudinary();


app.use(errorMiddleware);



app.listen(port,()=>{
    console.log(`Server is running http://localhost:${port}`);
})