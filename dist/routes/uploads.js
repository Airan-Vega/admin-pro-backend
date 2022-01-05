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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const async_middleware_1 = require("async-middleware");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const uploadController = __importStar(require("../controllers/uploads"));
const validar_jwt_1 = require("../middlewares/validar-jwt");
/*
 * Hospitales
 * Ruta: /api/upload
 */
const router = express_1.Router();
// Middleware
router.use(express_fileupload_1.default());
router.put("/:tipo/:id", [validar_jwt_1.validarJWT], async_middleware_1.wrap(uploadController.fileUpload));
router.get("/:tipo/:file", async_middleware_1.wrap(uploadController.retornarImagen));
module.exports = router;
