import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.model";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validateJWT";

export const login = async (req:Request, res: Response) => {
    const {email,password} = req.body;
    try {
        //verificar si el login 
        console.log(email)
        const usuario = await UsuarioModel.findOne({email})
        console.log(usuario)
        if (!usuario){
            return res.status(401).json({
                ok:false,
                msg: "Credenciales no son validas"
            })
        }
        //verificar el password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(401).json({
                ok:false,
                msg:"Las credenciales no son validas"
            })
        }
        //Generar token
        const token = await generateJWT(usuario.id, usuario.email) //los otros dos parametros se pueden omitir pq ya se definieron
         
        res.status(200).json({
            ok:true,
            usuario: usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            error,
            msg:"Hable con el administrador"

        })
    }
};

export const renovarToken = async (req: CustomRequest, res: Response) => {
    const id = req._id;
    try {
        if(typeof id === "undefined"){
            console.log(id)
            throw new Error("No existe un id")
        }
        const usuario = await UsuarioModel.findById(id);
    
        //Generar token
        const token = await generateJWT(id.toString())
    
        res.json({
            ok: true,
            token,
            usuario 
        })
        
    } catch (error) {
        console.error(error)
        res.status(401).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}
//////////////////

export const olvidoContrasena = async (req: Request, res: Response) => {
    const { login: email,  noDocumento } = req.body;
  
    try {
      const existeUsuario = await UsuarioModel.findOne({
        login: email,
        noDocumento,
      });
  
      if (!existeUsuario) {
        res.status(400).json({
          ok: false,
          msg: "No coinciden sus credenciales",
        });
      }
  
      const id = existeUsuario?._id;
  
      if (id) {
        // Generar Token
        const token = await generateJWT(
          id,
          email,
          "1H",
          process.env.JWT_SECRET_PASS
        );
  
        res.status(200).json({
          ok: true,
          msg: "Proceso éxito",
          usuario: existeUsuario,
          token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        ok: false,
        msg: "No se logró validar su acceso con éxito, por favor comuniquese con el administrador",
      });
    }
  };
  
  export const cambioContrasena = async (req: CustomRequest, res: Response) => {
    const id = req._id;//aca si se necesita el id pq viene del token
    const { password } = req.body;
  
    try {
      if (!password) {
        res.status(400).json({
          ok: false,
          msg: "Por favor dígite una contraseña válida",
        });
      }
  
      const newPassword = bcrypt.hashSync(password, 10);//el diez son los numeros de saltob s
  
      const actualizarPassword = await UsuarioModel.findByIdAndUpdate({
        _id: id,
        password: newPassword,
      });
  
      if (!actualizarPassword) {
        res.status(400).json({
          ok: false,
          msg: "Error al actualizar la contraseña",
        });
      }
      res.status(200).json({
        ok: true,
        msg: "Contraseña actualizada",
        usuario: actualizarPassword,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        ok: false,
        msg: "Error al actualizar la contraseña, hable con el administrador",
      });
    }
  };
  