exports.check_id_param = (req,res,next) => {
    if(req.kauth.grant.access_token.content.sub == req.params.id){
        next();
    }
    else{
        res.status(401).send({
            message: "Accesso alla risorsa non consentito"
        });
    }
}

exports.check_id_body = (req,res,next) => {
    if(req.kauth.grant.access_token.content.sub == req.body.id){
        next();
    }
    else{
        res.status(401).send({
            message: "Accesso alla risorsa non consentito"
        });
    }
}