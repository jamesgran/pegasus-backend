import { Router } from "express";
import { check } from "express-validator";
import { actualizarCliente, actualizarEstado, crearClientes, eliminarCliente, getClienteById, getClientes } from "../controllers/cliente.controller";
import { validarCampos } from "../middlewares/validarCampos";
import validateJWT from "../middlewares/validateJWT";

const router = Router();
 
router.post("/", 
//validateJWT,

[
check("nombre", "El nombre es obligatorio").not().isEmpty(),
check("telefono", "El telefono es obligatorio").not().isEmpty(),
check("email","El Email es obligatorio").not().isEmpty().isEmail(),
check("tipoDocumento", "El tipo de documento es obligatorio").not().isEmpty(),
check("noDocumento", "El numero de documento es obligatorio").not().isEmpty(),
validarCampos

], 

crearClientes); 
router.get('/', validateJWT,  getClientes)
router.get("/:id" ,validateJWT, getClienteById);
router.put("/:id" ,validateJWT,  actualizarCliente);
router.delete("/:id" ,validateJWT,  eliminarCliente);
router.put("/estado/:id" , validateJWT, actualizarEstado);
export default router;