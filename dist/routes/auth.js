"use strict";
/*
 * Auth
 * Ruta: /api/login
 */
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
const authController = __importStar(require("../controllers/auth"));
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = express_1.Router();
router.post("/", [
    express_validator_1.check("email", "El email es obligatorio").isEmail(),
    express_validator_1.check("password", "El password es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(authController.login));
router.post("/google", [
    express_validator_1.check("token", "El token de Google es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(authController.googleSignIn));
router.get("/renew", [validar_jwt_1.validarJWT], async_middleware_1.wrap(authController.renewToken));
module.exports = router;
