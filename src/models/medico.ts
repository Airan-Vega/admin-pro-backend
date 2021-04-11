import { DocumentType } from "@typegoose/typegoose";
import { Usuario } from "./usuario";
import { Hospital } from "./hospital";
import {
	Ref,
	prop,
	modelOptions,
	getModelForClass,
	Severity,
} from "@typegoose/typegoose";

@modelOptions({
	schemaOptions: {
		collection: "Medico",
		toJSON: {
			transform: (doc: DocumentType<Medico>, object) => {
				delete object.__v;
			},
		},
	},
	options: { allowMixed: Severity.ALLOW },
})
export class Medico {
	@prop({ required: true })
	nombre: string;
	@prop()
	img?: string;
	@prop({ ref: "Usuario", required: true })
	usuario: Ref<Usuario>;
	@prop({ ref: "Hospital", required: true })
	hospital: Ref<Hospital>;
}

export const MedicoModel = getModelForClass(Medico);
