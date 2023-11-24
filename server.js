import express from 'express';
import path from 'path'
import ejsLayouts from 'express-ejs-layouts'
import session from 'express-session';

import ProductController from './src/controller/product.controller.js';
import UserController from './src/controller/user.controller.js';
import addProductDataValidation from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import authentication from './src/middlewares/auth.middleware.js';

const server = express();
const port = 5000;

// Statically exposing the public folder
server.use(express.static('public'))

// Initializing the cookie
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secret : true}
}))

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
server.get('/',authentication,productController.getProducts)
server.get('/new',authentication,productController.getAddForm)
server.post('/',authentication,uploadFile.single('imageUrl'),addProductDataValidation,productController.addNewProduct)
server.get('/update/:id',authentication,productController.getUpdateProductView)
server.post('/update',authentication,productController.postUpdateProduct)
server.post('/delete/:id',authentication,productController.deleteProduct)


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
