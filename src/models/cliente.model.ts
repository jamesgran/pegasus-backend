import { Model, Schema, model } from "mongoose";
const usuario = require("./usuario.model");


export   const ClienteSchema = new Schema({
  nombre: { type: String, required: true},
  direccion: {type: String, required: false},
  telefono: {type: String, required: true},
  email: {type: String, required: true},
  tipoDocumento: {type: String, required: true},
  noDocumento: {type: String, required: true, unique: true},
  estado: {type: Boolean, required:true, default: true},
  createdAt: {type: Date, default:Date.now() },
  usuario_id: {type: Schema.Types.ObjectId, ref: 'usuario'}
  
});
 export const ClienteModel: Model<any> = model("cliente", ClienteSchema)


