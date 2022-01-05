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
exports.borrarMedico = exports.actualizarMedico = exports.crearMedico = exports.getMedicoById = exports.getMedicos = void 0;
const medico_1 = require("../models/medico");
function getMedicos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = Number(req.query.from) || 0;
        const [medicos, total] = yield Promise.all([
            /*********** Promesa 1 ****************/
            medico_1.MedicoModel.find()
                .populate("usuario", "nombre img")
                .populate("hospital", "nombre img")
                .skip(from)
                .limit(5)
                .lean(),
            /*********** Promesa 2 ****************/
            medico_1.MedicoModel.estimatedDocumentCount(),
        ]);
        try {
            return res.json({
                ok: true,
                medicos,
                total,
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
function getMedicoById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const medico = yield medico_1.MedicoModel.findById(id)
                .populate("usuario", "nombre img")
                .populate("hospital", "nombre img")
                .lean();
            return res.json({
                ok: true,
                medico,
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
exports.getMedicoById = getMedicoById;
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
        const id = req.params.id;
        const uid = req.uid;
        try {
            const medicoDB = yield medico_1.MedicoModel.findById(id);
            if (!medicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Médico no encontrado por id",
                });
            }
            const cambioMedico = Object.assign(Object.assign({}, req.body), { usuario: uid });
            const medicoActualizado = yield medico_1.MedicoModel.findByIdAndUpdate(id, cambioMedico, { new: true });
            return res.json({
                ok: true,
                medico: medicoActualizado,
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
exports.actualizarMedico = actualizarMedico;
function borrarMedico(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const medicoDB = yield medico_1.MedicoModel.findById(id);
            if (!medicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Médico no encontrado por id",
                });
            }
            yield medico_1.MedicoModel.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: "Médico Eliminado",
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
exports.borrarMedico = borrarMedico;
