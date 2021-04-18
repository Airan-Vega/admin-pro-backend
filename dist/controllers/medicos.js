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
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrarMedico = exports.actualizarMedico = exports.crearMedico = exports.getMedicos = void 0;
const medico_1 = require("../models/medico");
function getMedicos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const medicos = yield medico_1.MedicoModel.find()
            .populate("usuario", "nombre img")
            .populate("hospital", "nombre img");
        try {
            return res.json({
                ok: true,
                medicos,
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Error inesperado, hable con el administrador",
            });
        }
    });
}
exports.getMedicos = getMedicos;
function crearMedico(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.uid;
        const medico = new medico_1.MedicoModel(Object.assign({ usuario: uid }, req.body));
        try {
            const medicoDB = yield medico.save();
            return res.json({
                ok: true,
                medico: medicoDB,
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
exports.crearMedico = crearMedico;
function actualizarMedico(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            ok: true,
            msg: "Put Medico",
        });
    });
}
exports.actualizarMedico = actualizarMedico;
function borrarMedico(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            ok: true,
            msg: "Delete Medico",
        });
    });
}
exports.borrarMedico = borrarMedico;
