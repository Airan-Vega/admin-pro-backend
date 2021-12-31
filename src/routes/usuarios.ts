/*
 * Usuarios
 * Ruta: /api/usuarios
 */

import { Router } from "express";
import { check } from "express-validator";
import { wrap } from "async-middleware";
import * as usuarioController from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";
import {
	validarJWT,
	validarADMIN_ROLE,
	validarADMIN_ROLE_O_MismoUsuario,
} from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT], wrap(usuarioController.getUsuarios));
router.post(
	"/",
	[
		validarADMIN_ROLE,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		validarCampos,
	],
	wrap(usuarioController.crearUsuario)
);
router.put(
	"/:id",
	[
		validarJWT,
		validarADMIN_ROLE_O_MismoUsuario,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("role", "El role es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(usuarioController.actualizarUsuario)
);

router.delete(
	"/:id",
	[validarJWT, validarADMIN_ROLE],
	wrap(usuarioController.borrarUsuario)
);

module.exports = router;
