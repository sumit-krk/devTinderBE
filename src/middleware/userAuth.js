const userAuth=(req, res, next)=>{
    console.log(req.query)
    if(req.query.name==="sumit"){
        next()
    }
    else{
        res.status(401).send("Invalid User")
    }
}

module.exports={
    userAuth
}