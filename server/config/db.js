import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{dbName:"Portfoliyo"});
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log("Running in offline mode (no DB connection)");
    }
};

