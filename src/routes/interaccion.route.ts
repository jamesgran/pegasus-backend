import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import validateJWT from "../middlewares/validateJWT";
import { actualizarInteraccion, crearInteraccion, getInteraccionesByUsuario } from "../controllers/interaccion.controller";

const router = Router();
 
router.post("/", 
validateJWT,

[
check("fecha", "La fecha es obligatorio").not().isEmpty(),
check("tipo", "El tipo de interaccion es olbigatorio").not().isEmpty(),
check("detalles", "Detalles es olbigatorio").not().isEmpty(),
check("resultado", "El resultado de interaccion es olbigatorio").not().isEmpty(),
check("cliente_id", "El cliente de interaccion es olbigatorio").not().isEmpty(),
check("usuario_id", "El usuario de interaccion es olbigatorio").not().isEmpty(),
validarCampos

], 
crearInteraccion); 

router.get("/interaccionesByUsuario/:id" ,validateJWT, getInteraccionesByUsuario);
router.put("/:id" ,validateJWT,  actualizarInteraccion);

/* router.get('/', validateJWT,  getOportunidades)

router.put("/:id" ,validateJWT,  actualizarOportunidad); */

/* router.get("/:id" ,validateJWT, getClientesByUsuario);

router.delete("/:id" ,validateJWT,  eliminarCliente);
router.put("/estado/:id" , validateJWT, actualizarEstado); */
export default router;