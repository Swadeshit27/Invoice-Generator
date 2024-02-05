


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CounterState, Product } from '../types';


const initialState: CounterState = {
    products: [],
    totalPrice: 0,
    token: "",
    user: null,
    invoice: {
        invoiceNumber: "",
        customerName: "",
        customerEmail: "",
        finalPrice: 0,
        products: []
    }
}

export const counterSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<Product>) => {
            const { qty, price } = action.payload;
            state.totalPrice += qty * price;
            state.products.push({ ...action.payload });
        },
        deleteProducts: (state, action: PayloadAction<Product>) => {
            const { qty, price, id } = action.payload;
            state.totalPrice -= qty * price;
            state.products = state.products.filter(item => item.id !== id);
        },
        clearAllProducts: (state) => {
            state.products = [];
            state.totalPrice = 0;
        },
        updateInvoiceData: (state, action) => {
            const { id, products, totalPrice } = action.payload;
            state.invoice.customerName = state.user!.name;
            state.invoice.customerEmail = state.user!.email;
            state.invoice.finalPrice = totalPrice
            state.invoice.invoiceNumber = id;
            state.invoice.products = products;
        },
        resetInvoice: (state) => {
            state.invoice.invoiceNumber = "",
                state.invoice.customerName = "",
                state.invoice.customerEmail = "",
                state.invoice.finalPrice = 0,
                state.invoice.products = []
        },
        addUserDetails: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOutUser: (state) => {
            state.user = null;
            state.token = "";
        }
    },
})

export const { addProducts, deleteProducts, addUserDetails, logOutUser, clearAllProducts, updateInvoiceData, resetInvoice } = counterSlice.actions;

export default counterSlice.reducer;
