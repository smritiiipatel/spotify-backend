import mongoose from "mongoose";

 export default async function connectDB() {
    try{

    await mongoose.connect(process.env.MONGO_URL)
    console.log("database connected successfully");

    }catch(error){

       console.log("coneection failed to database", error);
    }
}