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
exports.borrarHospital = exports.actualizarHospital = exports.crearHospital = exports.getHospitales = void 0;
const hospital_1 = require("../models/hospital");
function getHospitales(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = Number(req.query.from) || 0;
        const [hospitales, total] = yield Promise.all([
            /*********** Promesa 1 ****************/
            hospital_1.HospitalModel.find({}, "nombre img")
                .populate("usuario", "nombre img")
                .skip(from)
                .limit(5)
                .lean(),
            /*********** Promesa 2 ****************/
            hospital_1.HospitalModel.estimatedDocumentCount(),
        ]);
        try {
            return res.json({
                ok: true,
                hospitales,
                total,
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
exports.getHospitales = getHospitales;
function crearHospital(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uid = req.uid;
        const hospital = new hospital_1.HospitalModel(Object.assign({ usuario: uid }, req.body));
        try {
            const hospitalDB = yield hospital.save();
            return res.json({
                ok: true,
                hospital: hospitalDB,
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
exports.crearHospital = crearHospital;
function actualizarHospital(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const uid = req.uid;
        try {
            const hospitalDB = yield hospital_1.HospitalModel.findById(id);
            if (!hospitalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Hospital no encontrado por id",
                });
            }
            const cambiosHospital = Object.assign(Object.assign({}, req.body), { usuario: uid });
            const hospitalActualizado = yield hospital_1.HospitalModel.findByIdAndUpdate(id, cambiosHospital, { new: true });
            return res.json({
                ok: true,
                hospital: hospitalActualizado,
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
exports.actualizarHospital = actualizarHospital;
function borrarHospital(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const hospitalDB = yield hospital_1.HospitalModel.findById(id);
            if (!hospitalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "Hospital no encontrado por id",
                });
            }
            yield hospital_1.HospitalModel.findByIdAndDelete(id);
            return res.json({
                ok: true,
                msg: "Hospital Eliminado",
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
exports.borrarHospital = borrarHospital;
