import mongoose, { Schema, InferSchemaType } from "mongoose";

const productSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    products: [
        {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            qty: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            },
        }
    ],
    totalPrice: {
        type: String,
        required: true,
    }

}, { timestamps: true });

type product = InferSchemaType<typeof productSchema>;

const Products = mongoose.model('Product', productSchema);
export default Products;