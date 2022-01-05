"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicoModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    usuario: {
        type: mongoose_1.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    hospital: {
        type: mongoose_1.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
});
exports.MedicoModel = mongoose_1.model("Medico", schema, "Medico");
