import { Router } from "express";
import { wrap } from "async-middleware";
import * as busquedaController from "../controllers/busquedas";

import { validarJWT } from "../middlewares/validar-jwt";

/*
 * Hospitales
 * Ruta: /api/todo
 */

const router = Router();

router.get("/:busqueda", [validarJWT], wrap(busquedaController.getTodo));
router.get(
	"/coleccion/:tabla/:busqueda",
	[validarJWT],
	wrap(busquedaController.getDocumentosColeccion)
);

module.exports = router;
