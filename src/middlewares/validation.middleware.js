import {body,validationResult} from 'express-validator'

export default async function addProductDataValidation(req, res, next){
    // Validating data using express-validator
    // todo: 1. Setup Rules for validation
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt:0 }).withMessage('Price must be positive Value'),
        body('imageUrl').isURL().withMessage('Invalid Url')
    ];

    // todo: 2. Run the rules
    await Promise.all(rules.map((rule)=>{
        return rule.run(req)
    }))

    //todo: 3. Check for the errors
    let validationErrors = validationResult(req)

    //todo: 4. if errors, return the error message
    if(!validationErrors.isEmpty()){
         return res.render('new-products',{errorMessage: validationErrors.array()[0].msg})
    }else
        next();
} 