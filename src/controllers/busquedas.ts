import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario";
import { MedicoModel } from "../models/medico";
import { HospitalModel } from "../models/hospital";

export async function getTodo(req: Request, res: Response) {
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, "i");

	const [usuarios, medicos, hospitales] = await Promise.all([
		UsuarioModel.find({
			nombre: regex,
		}),
		MedicoModel.find({
			nombre: regex,
		}),

		HospitalModel.find({
			nombre: regex,
		}),
	]);

	return res.json({
		ok: true,
		usuarios,
		medicos,
		hospitales,
	});
}

export async function getDocumentosColeccion(req: Request, res: Response) {
	const tabla = req.params.tabla;
	const busqueda = req.params.busqueda;
	const regex = new RegExp(busqueda, "i");
	let data = [];

	switch (tabla) {
		case "Medico":
			data = await MedicoModel.find({
				nombre: regex,
			})
				.populate("usuario", "nombre img")
				.populate("hospital", "nombre img");
			break;

		case "Hospital":
			data = await HospitalModel.find({
				nombre: regex,
			}).populate("usuario", "nombre img");
			break;

		case "Usuario":
			data = await UsuarioModel.find({
				nombre: regex,
			});

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
	});
}
