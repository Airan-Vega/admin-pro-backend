/*
 * Usuarios
 * Ruta: /api/usuarios
 */

import { Router } from "express";
import { check } from "express-validator";
import { wrap } from "async-middleware";
import * as usuarioController from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT], wrap(usuarioController.getUsuarios));
router.post(
	"/",
	[
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
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("role", "El role es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(usuarioController.actualizarUsuario)
);

router.delete("/:id", [validarJWT], wrap(usuarioController.borrarUsuario));

module.exports = router;
