import { Request, Response } from "express";
import { UsuarioModel, Usuario } from "../models/usuario";
import { MedicoModel, Medico } from "../models/medico";
import { HospitalModel, Hospital } from "../models/hospital";

export async function getTodo(req: Request, res: Response) {
	const busqueda = req.params.busqueda;
	// En las busquedas se ignoro los acentos, mayusculas y minusculas
	const regex = new RegExp(
		busqueda
			.replace(/a/g, "[a,á,à,ä]")
			.replace(/e/g, "[e,é,ë]")
			.replace(/i/g, "[i,í,ï]")
			.replace(/o/g, "[o,ó,ö,ò]")
			.replace(/u/g, "[u,ü,ú,ù]"),
		"i"
	);

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
	// En las busquedas se ignoro los acentos, mayusculas y minusculas
	const regex = new RegExp(
		busqueda
			.replace(/a/g, "[a,á,à,ä]")
			.replace(/e/g, "[e,é,ë]")
			.replace(/i/g, "[i,í,ï]")
			.replace(/o/g, "[o,ó,ö,ò]")
			.replace(/u/g, "[u,ü,ú,ù]"),
		"i"
	);
	let data: Medico | Hospital | Usuario[] = [];
	const from: number = Number(req.query.from) || 0;

	let total: number;

	switch (tabla) {
		case "Medico":
			data = await MedicoModel.find({
				nombre: regex,
			})
				.populate("usuario", "nombre img")
				.populate("hospital", "nombre img")
				.skip(from)
				.limit(5)
				.lean();

			total = await MedicoModel.find({
				nombre: regex,
			}).countDocuments();
			break;

		case "Hospital":
			data = await HospitalModel.find({
				nombre: regex,
			})
				.populate("usuario", "nombre img")
				.skip(from)
				.limit(5)
				.lean();

			total = await HospitalModel.find({
				nombre: regex,
			}).countDocuments();
			break;

		case "Usuario":
			data = await UsuarioModel.find({
				nombre: regex,
			})
				.skip(from)
				.limit(5)
				.lean();

			total = await UsuarioModel.find({
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
}
