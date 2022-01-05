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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = require("../models/usuario");
const jwt_1 = require("../helpers/jwt");
function getUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = Number(req.query.from) || 0;
        try {
            const [usuarios, total] = yield Promise.all([
                /*********** Promesa 1 ****************/
                usuario_1.UsuarioModel.find({}, "nombre email role google img")
                    .skip(from)
                    .limit(5)
                    .lean(),
                /*********** Promesa 2 ****************/
                usuario_1.UsuarioModel.estimatedDocumentCount(),
            ]);
            return res.json({
                ok: true,
                usuarios,
                total,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.getUsuarios = getUsuarios;
function crearUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const existeEmail = yield usuario_1.UsuarioModel.findOne({
                email,
            });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Este correo ya existe en la DB",
                });
            }
            const usuario = new usuario_1.UsuarioModel(req.body);
            // Encriptar contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            usuario.password = bcryptjs_1.default.hashSync(password, salt);
            // Guardar usuario
            yield usuario.save();
            // Generar TOKEN del usuario
            const token = yield jwt_1.generarJWT(usuario._id);
            return res.json({
                ok: true,
                usuario,
                token,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.crearUsuario = crearUsuario;
function actualizarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Validar token y comprobar si es el usuario correcto
        const uid = req.params.id;
        try {
            const usuarioDB = yield usuario_1.UsuarioModel.findById(uid).lean();
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe un usuario con ese id",
                });
            }
            // Actualización
            // Yo no quiero actualizar ni el campo de password ni el de google, por lo que
            // los saco del objeto campo
            const _a = req.body, { password, google, email } = _a, campos = __rest(_a, ["password", "google", "email"]);
            if (usuarioDB.email !== email) {
                const existeEmail = yield usuario_1.UsuarioModel.findOne({ email });
                if (existeEmail) {
                    return res.status(404).json({
                        ok: false,
                        msg: "Ya existe un usuario con ese email",
                    });
                }
            }
            if (!usuarioDB.google) {
                campos.email = email;
            }
            else if (usuarioDB.email !== email) {
                return res.status(404).json({
                    ok: false,
                    msg: "Usuarios de Google no pueden cambiar su correo",
                });
            }
            const usuarioActualizado = yield usuario_1.UsuarioModel.findByIdAndUpdate(uid, campos, { new: true });
            return res.json({
                ok: true,
                usuario: usuarioActualizado,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.actualizarUsuario = actualizarUsuario;
function borrarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.params.id;
        try {
            const usuarioDB = yield usuario_1.UsuarioModel.findById(uid);
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe un usuario con ese id",
                });
            }
            yield usuario_1.UsuarioModel.findByIdAndDelete(uid);
            return res.status(200).json({
                ok: true,
                msg: "Usuario eliminado",
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.borrarUsuario = borrarUsuario;
//# sourceMappingURL=usuarios.js.map