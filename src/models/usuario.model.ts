import { Model, Schema, model } from "mongoose";

const UsuarioSchema = new Schema ({
    nombre: {type: String, required: true},
    tipoDocumento: {type: String, required: true},
    noDocumento: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, required: true, default: "admin"},
    estado: {type: Boolean, required: true, default: true},
    createdAt: {type: Date, default: Date.now()},  
});
export const UsuarioModel: Model<any>= model("usuario", UsuarioSchema)