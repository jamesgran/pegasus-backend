import { Model, Schema, model } from "mongoose";


export   const interaccionSchema = new Schema({
  fecha: { type: Date, required: true},
  tipo: {type: String, required: true},
  detalles: {type: String, required: true},
  resultado: {type: String, required: true},
  calificacion: {type: String},
  notas: {type: String},
  cliente_id: {type: Schema.Types.ObjectId, required:true, ref: 'cliente'},
  usuario_id: {type: Schema.Types.ObjectId, required: true, ref: 'usuario'}
  
});
 export const InteraccionModel: Model<any> = model("interaccion", interaccionSchema)