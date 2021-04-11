import { Router } from "express";
import { wrap } from "async-middleware";
import expressFileUpload from "express-fileupload";
import * as uploadController from "../controllers/uploads";
import { validarJWT } from "../middlewares/validar-jwt";

/*
 * Hospitales
 * Ruta: /api/upload
 */

const router = Router();

// Middleware
router.use(expressFileUpload());

router.put("/:tipo/:id", [validarJWT], wrap(uploadController.fileUpload));
router.get("/:tipo/:file", wrap(uploadController.retornarImagen));

module.exports = router;
