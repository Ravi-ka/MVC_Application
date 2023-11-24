export default function authentication(req, res, next){
    if(req.session.userEmail){
        next();
    }
    else{
        res.redirect('/login')
    }
}