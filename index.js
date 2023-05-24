import express from "express";
import { productRouter } from "./routes/ProductRouter.js";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json())

app.use("/",productRouter)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log('Server running on port 5000')
})




