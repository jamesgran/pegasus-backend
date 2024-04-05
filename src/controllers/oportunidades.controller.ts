import { Request, Response } from "express";
import { OportuniadModel } from "../models/oportunidad.model";
import { ClienteModel } from "../models/cliente.model";

export const crearOportunidad = async (req: Request, res: Response) => {
  const { body } = req;
  const {cliente_id} = body
  

  try {
    const existeCliente = await ClienteModel.findOne({_id:
        cliente_id
    })
    
    if(!existeCliente){
        return res.status(409).json({
            ok: false,
            msg: `No existe el cliente`
        })
    }
    const nuevaOportunidad = new OportuniadModel(body);
    const oportunidadCreada = await nuevaOportunidad.save();

    res.status(200).json({
      ok: true,
      msg: "Oportunidad Creada",
      Oportunidad: oportunidadCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear O",
    });
  }
};

export const getOportunidades = async (req: Request, res: Response) => {
   
    try {
      const oportunidades = await OportuniadModel.find().populate('cliente_id')
      console.log(oportunidades)

      res.status(200).json({
        ok: true,
        oportunidades,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar",
    

      })
      
    }
  };

  export const getOportunidadesByUsuario = async (req: Request, res: Response) => {
    try {
      
      const id = req.params.id;
      //busca todos los clientes
      const oportunidades = await OportuniadModel.find({usuario_id: id}).populate('cliente_id')//el guion es añadido por mongo
      res.status(200).json({
        ok: true,
        oportunidades,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar "
      })
      
    }
  };
    
  export const actualizarOportunidad = async (req: Request, res: Response) => {
    try {
      //id del cliente
      const id = req.params.id;
      const { body } = req; //desestructuirar objeto
      const oportunidadActualizada = await OportuniadModel.findByIdAndUpdate(id, body, {new:true})//el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
      res.status(200).json({
        ok: true,
        oportunidadActualizada,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al actualizar oportunidad"
      })
    }
  };
