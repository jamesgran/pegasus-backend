import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import {
  cambioContrasena,
  login,
  olvidoContrasena,
  renovarToken,
} from "../controllers/auth.controller";
import validateJWT, { validateJWTPassword } from "../middlewares/validateJWT";

const router = Router();
router.post(
  "/",

  //express-validators para usar check
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  login
);

router.get("/", validateJWT, renovarToken);

router.post(
  "/olvidocontrasena",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("noDocumento", "El nunero de documento es obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],

  olvidoContrasena
);

router.put(
  "/cambiocontrasena",
  validateJWTPassword,
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  cambioContrasena
);

export default router;
