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