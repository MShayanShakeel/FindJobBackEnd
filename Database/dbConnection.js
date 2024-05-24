import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION, {
        dbName: "MERN_JOB_SEEKING_APP",
    }).then(() => {
        console.log('Connected to MongoDB Successfully!');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
};
