import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import { connectDB } from './db';

dotenv.config()
const app = express();
const port = process.env.PORT || 6001

// configure middlewares
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cors())

// db connection
connectDB();

// declare routes
import auth from "./routers/user.router" 
import product from "./routers/products.router"

app.use('/auth', auth);
app.use('/products', product);
app.get('/', (req, res) => { res.status(200).json("hello nice to meet you") })

app.listen(port, () => console.log('listening on port ' + port));