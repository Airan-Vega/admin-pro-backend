"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validarJWT(req, res, next) {
    // Leer el TOKEN (Lo leemos de los Headers), pero también se puede leer de la url
    const token = req.header("x-token") || req.params.token;
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No existe token en la petición",
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "TOKEN no valido",
        });
    }
}
exports.validarJWT = validarJWT;
