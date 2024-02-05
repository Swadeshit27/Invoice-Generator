import mongoose, { Schema, InferSchemaType } from "mongoose";

interface user {
    name: string,
    email: string,
    password: string
}
const userSchema = new Schema<user>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); 


const User = mongoose.model('User', userSchema);
export default User;