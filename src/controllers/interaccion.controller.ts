import { Request, Response } from "express";
import { OportuniadModel } from "../models/oportunidad.model";
import { ClienteModel } from "../models/cliente.model";
import { InteraccionModel } from "../models/interaccion.model";

export const crearInteraccion = async (req: Request, res: Response) => {
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
    const nuevaInteraccion = new InteraccionModel(body);
    const interaccionCreada = await nuevaInteraccion.save();

    res.status(200).json({
      ok: true,
      msg: "Interaccion Creada",
      Oportunidad: interaccionCreada,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear O",
    });
  }
};

export const getInteracciones = async (req: Request, res: Response) => {
   
    try {
      const interacciones = await InteraccionModel.find().populate('cliente_id')
      res.status(200).json({
        ok: true,
        interacciones,
      })
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar",
    

      })
      
    }
  };

  export const getInteraccionesByUsuario = async (req: Request, res: Response) => {
    try {
      let respuesta: any ={}
      const id = req.params.id;
      //busca todos los clientes
      const interacciones = await InteraccionModel.find({usuario_id: id})
      .populate({
        path: 'cliente_id',
        select: 'nombre noDocumento'
      }).lean()
      
      const desanidadoInteracciones = interacciones.map((interaccion: any) => {
        const { nombre, noDocumento } = interaccion.cliente_id;
        return { ...interaccion, nombre, noDocumento };
      });

      res.status(200).json({
        ok: true,
        interacciones: desanidadoInteracciones,
      })

    } catch (err) {
      res.status(400).json({
        ok: false,
        msg: "Error al consultar ",
        error: err
      })
      
    }
    
  };
    
export const actualizarInteraccion = async (req: Request, res: Response) => {
  try {
    //id del cliente
    const id = req.params.id;
    const { body } = req; //desestructuirar objeto
    const interaccionActualizada = await InteraccionModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    ); //el new:true sirve para que en la respuesta se muestre el nuevo valor. se puede omitir
    res.status(200).json({
      ok: true,
      interaccionActualizada,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar interaccion",
      error: err
    });
  }
}; 
