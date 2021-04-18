"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModel = exports.Hospital = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Hospital = class Hospital {
};
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Hospital.prototype, "nombre", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Hospital.prototype, "img", void 0);
__decorate([
    typegoose_1.prop({ ref: "Usuario", required: true }),
    __metadata("design:type", Object)
], Hospital.prototype, "usuario", void 0);
Hospital = __decorate([
    typegoose_1.modelOptions({
        schemaOptions: {
            collection: "Hospital",
            toJSON: {
                transform: (doc, object) => {
                    delete object.__v;
                },
            },
        },
        options: { allowMixed: typegoose_1.Severity.ALLOW },
    })
], Hospital);
exports.Hospital = Hospital;
exports.HospitalModel = typegoose_1.getModelForClass(Hospital);
