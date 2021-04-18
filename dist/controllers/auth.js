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
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const jwt_1 = require("../helpers/jwt");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const usuarioDB = yield usuario_1.UsuarioModel.findOne({
                email,
            });
            // Verificar email
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "El email o la contraseña no son validos",
                });
            }
            // Verificar contraseña
            const validPassword = bcryptjs_1.default.compareSync(password, usuarioDB.password);
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: "El email o la contraseña no son validos",
                });
            }
            // Generar el TOKEN
            const token = yield jwt_1.generarJWT(usuarioDB._id);
            return res.status(200).json({
                ok: true,
                token,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.login = login;
