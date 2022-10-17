import {Request, Response, NextFunction} from 'express';



const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization']
    console.log(headerToken);

    //bearer token se usa para

    if(headerToken != undefined && headerToken.startsWith('Bearer  ')) {

    //tiene token

    try {
        const bearerToken = headerToken.slice(7); 

        // jwt.verify(bearerToken, process.env.SECRET_KET);

        next()
    } catch (error){
        res.status(401).json({
            msg: 'Token inválido'
        })

    }

    } else {
        res.status(401).json({
            msg: 'Acceso denegado'
        })
    }
}

export default validateToken;

// rutas, primero validamos el token, con esto verificamos que el usuario tenga acceso, y lo dejamos seguir 
// router.get('/', validateToken, add user)