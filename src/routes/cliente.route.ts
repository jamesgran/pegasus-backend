import { Router } from "express";
import { check } from "express-validator";
import { crearClientes } from "../controllers/cliente.controller";
import { validarCampos } from "../middlewares/validarCampos";

const router = Router();
 
router.post("/", 

[
check("nombre", "El nombre es obligatorio").not().isEmpty(),
check("telefono", "El telefono es obligatorio").not().isEmpty(),
check("email","El Email es obligatorio").not().isEmpty().isEmail(),
check("tipoDocumento", "El tipo de documento es obligatorio").not().isEmpty(),
check("noDocumento", "El numero de documento es obligatorio").not().isEmpty(),
validarCampos

], 

crearClientes); 

export default router;