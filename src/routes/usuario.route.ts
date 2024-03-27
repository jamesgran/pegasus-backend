import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { actualizarUsuario, crearUsuario, eliminarUsuario, getUsuarioById, getUsuarios } from "../controllers/usuario.controller";
import validateJWT from "../middlewares/validateJWT";

const router = Router();
router.post("/",

//express-validators para usar check
[
check("nombre", "El nombre es obligatorio").not().isEmpty(),
check("tipoDocumento", "El tipo de documento es obligatorio").not().isEmpty(),
check("noDocumento", "El numero de documento es obligatorio").not().isEmpty(),
check("email","El Email es obligatorio").not().isEmpty().isEmail(),
check("password", "El nombre es obligatorio").not().isEmpty(),
validarCampos,
], 

crearUsuario);
router.get('/', validateJWT,  getUsuarios)
router.get("/:id" ,validateJWT, getUsuarioById);
router.put("/:id" ,validateJWT,  actualizarUsuario);
router.delete("/:id" ,validateJWT,  eliminarUsuario);



export default router;