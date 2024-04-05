import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import validateJWT from "../middlewares/validateJWT";
import { actualizarOportunidad, crearOportunidad, getOportunidades, getOportunidadesByUsuario } from "../controllers/oportunidades.controller";

const router = Router();
 
router.post("/", 
validateJWT,

[
check("descripcion", "La descripcion es obligatorio").not().isEmpty(),
check("deadline", "La fecha maxima es olbigatorio").not().isEmpty(),
validarCampos

], 
crearOportunidad); 

router.get('/', validateJWT,  getOportunidades)
router.get("/OportunidadesByUsuario/:id" ,validateJWT, getOportunidadesByUsuario);
router.put("/:id" ,validateJWT,  actualizarOportunidad);

/* router.get("/:id" ,validateJWT, getClientesByUsuario);

router.delete("/:id" ,validateJWT,  eliminarCliente);
router.put("/estado/:id" , validateJWT, actualizarEstado); */
export default router;