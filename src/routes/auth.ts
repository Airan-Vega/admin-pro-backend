import { Router } from "express";
import * as authController from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
		validarCampos,
	],
	authController.login
);

module.exports = router;
