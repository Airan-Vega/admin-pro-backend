import fs from "fs";
import { UsuarioModel } from "../models/usuario";
import { MedicoModel } from "../models/medico";
import { HospitalModel } from "../models/hospital";

function borrarImagen(path: string) {
	if (fs.existsSync(path)) {
		// Borrar la imagen anterior
		fs.unlinkSync(path);
	}
}

export async function actualizarImagen(
	tipo: string,
	id: string,
	nombreArchivo: string
) {
	let pathViejo: string;

	switch (tipo) {
		case "medicos":
			const medico = await MedicoModel.findById(id);
			if (!medico) {
				console.log("No hay ningun médico con ese ID");
				return false;
			}
			pathViejo = `./src/uploads/medicos/${medico.img}`;
			borrarImagen(pathViejo);

			medico.img = nombreArchivo;
			await medico.save();

			return true;

		case "hospitales":
			const hospital = await HospitalModel.findById(id);
			if (!hospital) {
				console.log("No hay ningun hospital con ese ID");
				return false;
			}
			pathViejo = `./src/uploads/hospitales/${hospital.img}`;
			borrarImagen(pathViejo);

			hospital.img = nombreArchivo;
			await hospital.save();

			return true;

		case "usuarios":
			const usuario = await UsuarioModel.findById(id);
			if (!usuario) {
				console.log("No hay ningun usuario con ese ID");
				return false;
			}
			pathViejo = `./src/uploads/usuarios/${usuario.img}`;
			borrarImagen(pathViejo);

			usuario.img = nombreArchivo;
			await usuario.save();

			return true;
	}
	console.log("vamos bien");
}
