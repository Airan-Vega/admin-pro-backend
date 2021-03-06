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
exports.getDocumentosColeccion = exports.getTodo = void 0;
const usuario_1 = require("../models/usuario");
const medico_1 = require("../models/medico");
const hospital_1 = require("../models/hospital");
function getTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const busqueda = req.params.busqueda;
        // En las busquedas se ignoro los acentos, mayusculas y minusculas
        const regex = new RegExp(busqueda
            .replace(/a/g, "[a,á,à,ä]")
            .replace(/e/g, "[e,é,ë]")
            .replace(/i/g, "[i,í,ï]")
            .replace(/o/g, "[o,ó,ö,ò]")
            .replace(/u/g, "[u,ü,ú,ù]"), "i");
        const [usuarios, medicos, hospitales] = yield Promise.all([
            usuario_1.UsuarioModel.find({
                nombre: regex,
            }),
            medico_1.MedicoModel.find({
                nombre: regex,
            }),
            hospital_1.HospitalModel.find({
                nombre: regex,
            }),
        ]);
        return res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales,
        });
    });
}
exports.getTodo = getTodo;
function getDocumentosColeccion(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;
        // En las busquedas se ignoro los acentos, mayusculas y minusculas
        const regex = new RegExp(busqueda
            .replace(/a/g, "[a,á,à,ä]")
            .replace(/e/g, "[e,é,ë]")
            .replace(/i/g, "[i,í,ï]")
            .replace(/o/g, "[o,ó,ö,ò]")
            .replace(/u/g, "[u,ü,ú,ù]"), "i");
        let data = [];
        const from = Number(req.query.from) || 0;
        let total;
        switch (tabla) {
            case "Medico":
                data = yield medico_1.MedicoModel.find({
                    nombre: regex,
                })
                    .populate("usuario", "nombre img")
                    .populate("hospital", "nombre img")
                    .skip(from)
                    .limit(5)
                    .lean();
                total = yield medico_1.MedicoModel.find({
                    nombre: regex,
                }).countDocuments();
                break;
            case "Hospital":
                data = yield hospital_1.HospitalModel.find({
                    nombre: regex,
                })
                    .populate("usuario", "nombre img")
                    .skip(from)
                    .limit(5)
                    .lean();
                total = yield hospital_1.HospitalModel.find({
                    nombre: regex,
                }).countDocuments();
                break;
            case "Usuario":
                data = yield usuario_1.UsuarioModel.find({
                    nombre: regex,
                })
                    .skip(from)
                    .limit(5)
                    .lean();
                total = yield usuario_1.UsuarioModel.find({
                    nombre: regex,
                }).countDocuments();
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: "La tabla tiene que ser Usuario, Medico u Hospital",
                });
        }
        return res.json({
            ok: true,
            resultados: data,
            total,
        });
    });
}
exports.getDocumentosColeccion = getDocumentosColeccion;
//# sourceMappingURL=busquedas.js.map