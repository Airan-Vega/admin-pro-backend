import { Router } from "express";
import { check } from "express-validator";
import { wrap } from "async-middleware";
import * as hospitalController from "../controllers/hospitales";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

/*
 * Hospitales
 * Ruta: /api/hospitales
 */

const router = Router();

router.get("/", [], wrap(hospitalController.getHospitales));
router.post(
	"/",
	[
		validarJWT,
		check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(hospitalController.crearHospital)
);
router.put(
	"/:id",
	[
		validarJWT,
		check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
		validarCampos,
	],
	wrap(hospitalController.actualizarHospital)
);

router.delete("/:id", [validarJWT], wrap(hospitalController.borrarHospital));

module.exports = router;
