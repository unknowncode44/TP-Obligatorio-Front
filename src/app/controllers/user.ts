// // controlador para el post de usuario y contraseña para register y login
// import { from } from "rxjs";
// import {Request, Response} from 'express';

// export const newUser = async (req:Request, res:Response) => {


//     //desectructuracion de datos, obtengo username y password del usuario
//     const {username, password} = req.body;
  
//     //validamos si el usuario ya existe en la base de datos
  
//     const user = await username.findOne({where: {username:username}});
  
//     //si el usuario ya existe, nos devuelve el error y corta la ejecucion
//     if(user) {
//         return res.status(400).json({
//             msg: 'Ya existe un usuario con el nombre ${username}'
//         })
//     }
  
//     //encriptamos la contraseña
//     const hashedPassword = await bcrypt.hash(password,10);
  
//     // capturo error por si el login es incorrecto
//     try {
//          // guardo el usuario en la base de datos, tambien paso el password hasheado
//         await user.create({
//             username: username,
//             password: hashedPassword
//         })
  
//     } catch (error) {
//         res.status(400).json({
//             msg: 'Ocurrio un error',
//             error
//         })
//     }
//   } 
  
  
//   export const loginUser = async (req: Request, res: Response) =>{
  
//     const {username, password} = req.body;
  
//     //Validamos si el usuario existe en la bdd
  
//     const user: any = await username.findOne({ where: {username:username}});
  
//     if(!user) {
//         return res.status(400).json ({
//             msg: 'No existe un usuario con el nombre ${username}'
//         })
//     }
  
//     //Validamos password... password = password que envia el usuario y user.password = password encriptado
//     //Validamos si el usuario escribió bien el password 
  
//     const passwordValid = await bcrypt.compare(password, user.password)
//     if(!passwordValid) {
//         return res.status(400).json ({
//             msg: 'Password incorrecto'
//         })
//     }
  
//     //Generamos token ..... SECRET_KEY es la firma, se genera en el archivo .env
//     //ExpiresIn, tiempo en el que expira el token
//     const token = jwt.sign({
//         username: username
//     }, process.env.SECRET_KEY, { expiresIn: '10000'});
  
//     res.json(token);
  
  
//   }
  