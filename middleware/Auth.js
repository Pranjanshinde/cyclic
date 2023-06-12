
var jwt = require('jsonwebtoken');

const Auth = (req,res,next)=>{
    let token=req.headers.authorization;

    if(token)
    {
        var decoded = jwt.verify(token, 'masai');
        console.log(decoded.userid);
        if(decoded)
        {
            if(decoded.userid==req.body.userid)
            {
                next();
            }
        }
    }
}

module.exports={Auth}