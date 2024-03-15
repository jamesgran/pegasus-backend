import { Request, Response } from "express";
import { ClienteModel } from "../models/cliente.model";

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