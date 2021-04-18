import { Router } from "express";
import { check } from "express-validator";
import { wrap } from "async-middleware";
import * as medicoController from "../controllers/medicos";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/*
 * Medicos
 * Ruta: /api/medicos
 */

const router = Router();

router.get("/", [], wrap(medicoController.getMedicos));
router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre del médico es obligatorio").not().isEmpty(),
		check("hospital", "El ID del hospital debe ser valido").isMongoId(),
		check(
			"hospital",
			"El ID del hospital al que pertenece el médico es obligatorio"
		)
			.not()
			.isEmpty(),
		validarCampos,
	],
	wrap(medicoController.crearMedico)
);
router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre del médico es obligatorio").not().isEmpty(),
		check("hospital", "El ID del hospital debe ser valido").isMongoId(),
		check(
			"hospital",
			"El ID del hospital al que pertenece el médico es obligatorio"
		)
			.not()
			.isEmpty(),
		validarCampos,
	],
	wrap(medicoController.actualizarMedico)
);

router.delete("/:id", [validarJWT], wrap(medicoController.borrarMedico));

module.exports = router;
