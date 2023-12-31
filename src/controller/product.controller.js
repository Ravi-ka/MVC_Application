import path from 'path';

import ProductModel from '../model/product.model.js';

export default class ProductController{
    getProducts(req, res){
         let products = ProductModel.get();
         res.render('products',{products,userEmail:req.session.userEmail})
         //console.log(products)
        //  return res.sendFile(path.join(path.resolve(),'src',"views",'products.html'))
    }

    getAddForm(req, res){
        return res.render('new-products',{errorMessage:null})
    }

    addNewProduct(req, res){
        // access data from form
        const {name, desc, price} = req.body;
        const imageUrl = 'Images/' + req.file.filename;
        console.log(req.body)
        ProductModel.add(name, desc, price,imageUrl)
        let products = ProductModel.get();
        return res.render('products',{products,userEmail:req.session.userEmail})
    }

    getUpdateProductView(req, res, next){
        // 1. if product exists then return view
    const id = req.params.id;
    console.log(id)
    const productFound = ProductModel.getById(id);
    console.log(productFound)
    if (productFound) {
      res.render('update-product', {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        var products = ProductModel.get();
        res.render('products', { products ,userEmail:req.session.userEmail});
      }

      deleteProduct(req, res){
        const Id = Number(req.params.id);
        const productFound = ProductModel.getById(Id);
        //console.log(productFound)
        if (!productFound) {
          return res.status(401).send('Product not found');
        }
        ProductModel.delete(Id)
        var products = ProductModel.get();
        res.render('products', { products ,userEmail:req.session.userEmail});
      }
}