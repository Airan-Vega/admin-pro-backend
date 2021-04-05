import { Router } from "express";
import { check } from "express-validator";
import * as usuarioController from "../controllers/usuarios";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.get("/", [validarJWT], usuarioController.getUsuarios);
router.post(
	"/",
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		validarCampos,
	],
	usuarioController.crearUsuarios
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
	usuarioController.actualizarUsuario
);

router.delete("/:id", [validarJWT], usuarioController.borrarUsuario);

module.exports = router;
