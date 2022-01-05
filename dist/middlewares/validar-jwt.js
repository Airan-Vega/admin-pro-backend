"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarADMIN_ROLE_O_MismoUsuario = exports.validarADMIN_ROLE = exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = require("../models/usuario");
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
function validarADMIN_ROLE(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.uid;
        try {
            const usuarioDB = yield usuario_1.UsuarioModel.findById(uid);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Usuario no existe",
                });
            }
            if (usuarioDB.role !== "ADMIN_ROLE") {
                return res.status(403).json({
                    ok: false,
                    msg: "Necesita privilegios de administrador",
                });
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Hable con el administrador",
            });
        }
    });
}
exports.validarADMIN_ROLE = validarADMIN_ROLE;
function validarADMIN_ROLE_O_MismoUsuario(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.uid;
        const id = req.params.id;
        try {
            const usuarioDB = yield usuario_1.UsuarioModel.findById(uid);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Usuario no existe",
                });
            }
            if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
                next();
            }
            else {
                return res.status(403).json({
                    ok: false,
                    msg: "Necesita privilegios de administrador",
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Hable con el administrador",
            });
        }
    });
}
exports.validarADMIN_ROLE_O_MismoUsuario = validarADMIN_ROLE_O_MismoUsuario;
//# sourceMappingURL=validar-jwt.js.map