export function validateRequest(req, res, next){
    // Validating data
    const {name,price,imageUrl} = req.body;
    let errors =[];
    if(!name || name.trim() ==''){
        errors.push('Name is Required')
    }
    if(!price || parseFloat(price) < 1){
        errors.push('Price must be a positive value')
    }
    try {
        const validUrl = new URL(imageUrl)
    } catch (error) {
        errors.push('URL is invalid')
    }
    if(errors.length > 0){
         return res.render('new-products',{errorMessage: errors[0]})
    }

    next();
} 