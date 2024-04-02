import { Request, Response } from "express";
import { ClienteModel } from "../models/cliente.model";

import { renovarToken } from "./auth.controller";

export const   crearClientes = async (req: Request, res: Response) => {
    const { body } = req;
    
    
    try {
      const clienteNuevo = new ClienteModel(body);
      const clienteCreado = await clienteNuevo.save();

      

      res.status(200).json({
        ok: true,
        msg: "Cliente Creado",
        Cliente: clienteCreado,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
          ok: true,
          msg: "Error al crear el cliente"
      })
    }
  };

  export const getClientes = async (req: Request, res: Response) => {
   
    try {
      //busca todos los clientes
      const clientes = await ClienteModel.find()
      .populate({
        path: 'usuario_id',
        select: 'nombre rol estado'
      })

      res.status(200).json({
        ok: true,
        clientes,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar 2",
    

      })
      
    }
  };
  
  export const getClientesByUsuario = async (req: Request, res: Response) => {
    try {
      
      const id = req.params.id;
      //busca todos los clientes
      const clientes = await ClienteModel.find({usuario_id: id})//el guion es añadido por mongo
      res.status(200).json({
        ok: true,
        clientes,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar "
      })
      
    }
  };
  
  export const actualizarCliente = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      const { body } = req; //desestructuirar objeto
      const clienteActualizado = await ClienteModel.findByIdAndUpdate(id, body, {new:true})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        clienteActualizado,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al actualizar "
      })
    }
  };
  export const eliminarCliente = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      
      const clienteEliminado = await ClienteModel.findByIdAndDelete({_id:id})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        clienteEliminado,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al eliminar "
      })
      
    }
  };
  
  
  export const actualizarEstado = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      
      const clienteActualizado = await ClienteModel.findByIdAndUpdate(id, {estado:false}, {new:true})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        clienteActualizado,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar "
      })
    }
  };