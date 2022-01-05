"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const async_middleware_1 = require("async-middleware");
const hospitalController = __importStar(require("../controllers/hospitales"));
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
/*
 * Hospitales
 * Ruta: /api/hospitales
 */
const router = express_1.Router();
router.get("/", [], async_middleware_1.wrap(hospitalController.getHospitales));
router.post("/", [
    validar_jwt_1.validarJWT,
    express_validator_1.check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(hospitalController.crearHospital));
router.put("/:id", [
    validar_jwt_1.validarJWT,
    express_validator_1.check("nombre", "El nombre del hospital es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(hospitalController.actualizarHospital));
router.delete("/:id", [validar_jwt_1.validarJWT], async_middleware_1.wrap(hospitalController.borrarHospital));
module.exports = router;
