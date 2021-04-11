import { DocumentType } from "@typegoose/typegoose";
import { Usuario } from "./usuario";
import {
	Ref,
	prop,
	modelOptions,
	getModelForClass,
	Severity,
} from "@typegoose/typegoose";

@modelOptions({
	schemaOptions: {
		collection: "Hospital",
		toJSON: {
			transform: (doc: DocumentType<Hospital>, object) => {
				delete object.__v;
			},
		},
	},
	options: { allowMixed: Severity.ALLOW },
})
export class Hospital {
	@prop({ required: true })
	nombre: string;
	@prop()
	img?: string;
	@prop({ ref: "Usuario", required: true })
	usuario: Ref<Usuario>;
}

export const HospitalModel = getModelForClass(Hospital);
