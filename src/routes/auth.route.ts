
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos";
import { cambioContrasena, login, olvidoContrasena, renovarToken } from "../controllers/auth.controller";
import validateJWT, { validateJWTPassword } from "../middlewares/validateJWT";

const router = Router();
router.post(
  "/",

  //express-validators para usar check
  [
    check("login", "El login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],

  login
);

export default router;