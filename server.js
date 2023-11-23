import express from 'express';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'

import ProductController from './src/controller/product.controller.js';
import UserController from './src/controller/user.controller.js';
import addProductDataValidation from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';

const server = express();
const port = 5000;

// Statically exposing the public folder
server.use(express.static('public'))

server.use(express.urlencoded({extended:true}))

// Setup viewEngine settings
server.set('view engine','ejs')
server.set('views',path.join(path.resolve(),'src',"views"))

//ejs-layout settings
server.use(ejsLayouts)

// Creating a new instance for the class
const productController = new ProductController();
const userController = new UserController();

// Routes
server.get('/register',userController.getRegister)
server.post('/register',userController.postRegister)
server.get('/login',userController.getLogin)
server.post('/login',userController.postLogin)
server.get('/',productController.getProducts)
server.get('/new',productController.getAddForm)
server.post('/',uploadFile.single('imageUrl'),addProductDataValidation,productController.addNewProduct)
server.get('/update/:id',productController.getUpdateProductView)
server.post('/update',productController.postUpdateProduct)
server.post('/delete/:id',productController.deleteProduct)


// server.use(express.static('src/views'))

// server.get('/',(req, res)=>{
//     return res.send('Welcome to MVC Application')
// })

// Creating a port to listen
server.listen(port,(err)=>{
    if(err) 
        console.log(err)
    else
        console.log(`Port is listening on ${port}`)
})
