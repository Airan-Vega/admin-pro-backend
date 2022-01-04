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
exports.renewToken = exports.googleSignIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const jwt_1 = require("../helpers/jwt");
const google_verify_1 = require("../helpers/google-verify");
const menu_frontend_1 = require("../helpers/menu-frontend");
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
                menu: menu_frontend_1.getMenuFrontEnd(usuarioDB.role),
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
function googleSignIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const googleToken = req.body.token;
        try {
            const { name, email, picture } = yield google_verify_1.googleVerify(googleToken);
            // Verificamos si el email con el que se quiere registrar el usuario,
            // existe en la base de datos
            const usuarioDB = yield usuario_1.UsuarioModel.findOne({ email });
            let usuario;
            if (!usuarioDB) {
                // No existe el usuario
                usuario = new usuario_1.UsuarioModel({
                    nombre: name,
                    email,
                    password: "123456789",
                    img: picture,
                    google: true,
                });
            }
            else {
                // Existe el usuario
                usuario = usuarioDB;
                usuario.google = true;
            }
            // Guardar en DB
            yield usuario.save();
            // Generar el TOKEN
            const token = yield jwt_1.generarJWT(usuario._id);
            return res.json({
                ok: true,
                token,
                menu: menu_frontend_1.getMenuFrontEnd(usuarioDB.role),
            });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({
                ok: false,
                msg: "Token de Google no es correcto",
            });
        }
    });
}
exports.googleSignIn = googleSignIn;
function renewToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.uid;
        // Generar el TOKEN
        const token = yield jwt_1.generarJWT(uid);
        const usuario = yield usuario_1.UsuarioModel.findById(uid);
        res.json({
            ok: true,
            token,
            usuario,
            menu: menu_frontend_1.getMenuFrontEnd(usuario.role),
        });
    });
}
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map