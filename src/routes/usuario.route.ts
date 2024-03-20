import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { crearUsuario } from "../controllers/usuario.controller";
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

export default router;