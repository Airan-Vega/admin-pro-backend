"use strict";
/*
 * Usuarios
 * Ruta: /api/usuarios
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
const usuarioController = __importStar(require("../controllers/usuarios"));
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = express_1.Router();
router.get("/", [validar_jwt_1.validarJWT], async_middleware_1.wrap(usuarioController.getUsuarios));
router.post("/", [
    validar_jwt_1.validarADMIN_ROLE,
    express_validator_1.check("nombre", "El nombre es obligatorio").not().isEmpty(),
    express_validator_1.check("password", "El password es obligatorio").not().isEmpty(),
    express_validator_1.check("email", "El email es obligatorio").isEmail(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(usuarioController.crearUsuario));
router.put("/:id", [
    validar_jwt_1.validarJWT,
    validar_jwt_1.validarADMIN_ROLE_O_MismoUsuario,
    express_validator_1.check("nombre", "El nombre es obligatorio").not().isEmpty(),
    express_validator_1.check("email", "El email es obligatorio").isEmail(),
    express_validator_1.check("role", "El role es obligatorio").not().isEmpty(),
    validar_campos_1.validarCampos,
], async_middleware_1.wrap(usuarioController.actualizarUsuario));
router.delete("/:id", [validar_jwt_1.validarJWT, validar_jwt_1.validarADMIN_ROLE], async_middleware_1.wrap(usuarioController.borrarUsuario));
module.exports = router;
//# sourceMappingURL=usuarios.js.map