import ProductModel from "../model/product.model.js";
import UserModel from "../model/user.model.js";


export default class UserController{

    getRegister(req, res){
        res.render('register',{errorMessage:null});
    }

    getLogin(req, res){
        res.render('login',{errorMessage:null})
    }

    postRegister(req, res){
        console.log(req.body);
        const {name, email, password} = req.body;
        const newUser = UserModel.addUser(name, email, password);
        res.render('login',{errorMessage:null})
    }

    postLogin(req, res){
        const {email, password} = req.body;
        const user = UserModel.verifyUser(email, password);
        if(!user){
            return res.render('login',{errorMessage: 'Invalid Credentials'})
        }
        let products = ProductModel.get();
         res.render('products',{products})
    }
}