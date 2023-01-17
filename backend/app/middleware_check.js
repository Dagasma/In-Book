exports.check_id_param = (id_name = "id") => (req,res,next) => {

    if(req.kauth.grant.access_token.content.sub == req.params[id_name]){
        next();
    }
    else{
        res.status(401).send({
            message: "Accesso alla risorsa non consentito"
        });
    }
}

exports.check_id_body = (id_name = "id") => (req,res,next) => {

    if(req.kauth.grant.access_token.content.sub == req.body[id_name]){
        next();
    }
    else{
        res.status(401).send({
            message: "Accesso alla risorsa non consentito"
        });
    }
}