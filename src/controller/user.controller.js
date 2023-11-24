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
        req.session.userEmail = email;
        console.log(req.session)
        let products = ProductModel.get();
         res.render('products',{products,userEmail:req.session.userEmail})
    }

    userLogout(req, res){
        // ! On logout, destroy the session and redirect to the login page
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/login')
            }
        })
        // ? Deleting the 'lastVisit' cookie while logout
        res.clearCookie('lastVisit')

    }
}