
import { Request, Response } from "express";
import Products from "../models/products.model";
import { ApiResponse } from "../utils/ApiResponse";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { id, products, totalPrice } = await req.body;
        const isExist = await Products.findOne({ id });
        if (isExist) {
            return res.status(409).json("Product is already exist");
        }
        const newProduct = await Products.create({ id, products, totalPrice });
        res.json(new ApiResponse(201, newProduct, "Product created successfully"));
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
}

export const allProducts = async (req: Request, res: Response) => {
    try {
        const products = await Products.find();
        if (!products) {
            return res.status(404).json('products is empty')
        }
        res.json(new ApiResponse(200, products, "Products found successfully"));
    } catch (error) {
        return res.status(500).json('Internal server error')
    }
}