"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModel = void 0;
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
});
exports.HospitalModel = mongoose_1.model("Hospital", schema, "Hospital");
