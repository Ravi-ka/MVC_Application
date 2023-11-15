import express from 'express';
import path from 'path'

import ProductController from './src/controller/product.controller.js';
const productController = new ProductController();

const server = express();
const port = 5000;

// Setup viewEngine settings
server.set('view engine','ejs')
server.set('views',path.join(path.resolve(),'src',"views"))

server.get('/',productController.getProducts)

// server.use(express.static('src/views'))

// server.get('/',(req, res)=>{
//     return res.send('Welcome to MVC Application')
// })

server.listen(port,()=>{
    console.log(`Port is listening on ${port}`)
})
