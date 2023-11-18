import express from 'express';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

import ProductController from './src/controller/product.controller.js';
import { validateRequest } from './src/middlewares/validation.middleware.js';

const server = express();
const port = 5000;

server.use(express.urlencoded({extended:true}))

// Setup viewEngine settings
server.set('view engine','ejs')
server.set('views',path.join(path.resolve(),'src',"views"))

//ejs-layout settings
server.use(ejsLayouts)

const productController = new ProductController();
server.get('/',productController.getProducts)
server.get('/new',productController.getAddForm)
server.post('/',validateRequest,productController.addNewProduct)

// server.use(express.static('src/views'))

// server.get('/',(req, res)=>{
//     return res.send('Welcome to MVC Application')
// })

server.listen(port,(err)=>{
    if(err) 
        console.log(err)
    else
        console.log(`Port is listening on ${port}`)
})
