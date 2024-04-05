import { Model, Schema, model } from "mongoose";
const cliente = require("./cliente.model");


export   const OportunidadSchema = new Schema({
  estado: { type: String, required: true, default: 'Abierta'},
  descripcion: {type: String, required: true},
  createdAt: {type: Date, default:Date.now() },
  deadline: {type: Date, required: true},
  cliente_id: {type: Schema.Types.ObjectId, ref: 'cliente'},
  usuario_id: {type: Schema.Types.ObjectId, ref: 'usuario'}
  
});
 export const OportuniadModel: Model<any> = model("Oportunidad", OportunidadSchema)
