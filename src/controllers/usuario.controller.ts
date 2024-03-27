import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.model";
import bcrypt from "bcryptjs";

export const  crearUsuario = async (req: Request, res: Response) => {
    //const { body } = req; otra forma de traer el body
    const {body} = req;
    const {email, password}= body;
    try { 
        const existeLogin = await UsuarioModel.findOne({
            //login: body.login,
            email: email,
        })
        if(existeLogin){
            return res.status(409).json({
                ok: false,
                msg: `Ya existe el login ${ email} creado`

            })
        }
        const nuevoUsuario = new UsuarioModel({//comparese con crear cliente
            ...body,
        })

        const salt = bcrypt.genSaltSync(10);
        nuevoUsuario.password = bcrypt.hashSync(password, salt)
        console.log("contraseña encriptada", nuevoUsuario.password)

        const usuarioCreado = await nuevoUsuario.save();

        res.status(200).json({
            ok: true,
            msg: "Usuario creado correctamente",
            usuarioCreado,

        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al crear el usuario"
        })
    }

    
}

export const getUsuarios = async (req: Request, res: Response) => {
    try {
      //busca todos los clientes
      const usuarios = await UsuarioModel.find();
      res.status(200).json({
        ok: true,
        usuarios,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar "
      })
      
    }
  };

  export const getUsuarioById = async (req: Request, res: Response) => {
    try {
      
      const id = req.params.id;
      
      const usuarios = await UsuarioModel .findById({_id: id})
      res.status(200).json({
        ok: true,
        usuarios,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar "
      })
      
    }
  };

  export const actualizarUsuario = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      const { body } = req; //desestructuirar objeto
      const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body, {new:true})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        usuarioActualizado,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al actualizar "
      })
    }
  };

  export const eliminarUsuario = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      
      const usuarioEliminado = await UsuarioModel.findByIdAndDelete({_id:id})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        usuarioEliminado,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al eliminar "
      })
      
    }
  };