import mongoose from "mongoose";


export const connection = async()=>{


    const URL = process.env.URL;


    mongoose.connect(URL).then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log("Database connection error :",err);
        process.exit(1);
    })
}