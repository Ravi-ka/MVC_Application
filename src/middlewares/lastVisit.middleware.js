export function setLastVisit(req, res, next){
    // todo:1- if cookies is set, then add a local variable with last visit time data
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    //todo:2 - if this is the first time, set the cookie
    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge: 2*24*60*60*1000
    })

    next();
}