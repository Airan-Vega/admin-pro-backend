/*
 * Auth
 * Ruta: /api/login
 */

import { Router } from "express";
import { check } from "express-validator";
import { wrap } from "async-middleware";
import * as authController from "../controllers/auth";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(authController.login)
);

router.post(
	"/google",
	[
		check("token", "El token de Google es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(authController.googleSignIn)
);

router.get("/renew", [validarJWT], wrap(authController.renewToken));

module.exports = router;
