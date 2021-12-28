import { Request, Response } from "express";
import { HospitalModel } from "../models/hospital";

export async function getHospitales(req: Request, res: Response) {
	const from: number = Number(req.query.from) || 0;
	const [hospitales, total] = await Promise.all([
		/*********** Promesa 1 ****************/
		HospitalModel.find({}, "nombre img")
			.populate("usuario", "nombre img")
			.skip(from)
			.limit(5)
			.lean(),
		/*********** Promesa 2 ****************/
		HospitalModel.estimatedDocumentCount(),
	]);

	try {
		return res.json({
			ok: true,
			hospitales,
			total,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function crearHospital(req: Request, res: Response) {
	const uid = req.uid;
	const hospital = new HospitalModel({
		usuario: uid,
		...req.body, // Aqui desestructuro el objeto que le paso por el body y solo pongo sus valores.
	});

	try {
		const hospitalDB = await hospital.save();
		return res.json({
			ok: true,
			hospital: hospitalDB,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function actualizarHospital(req: Request, res: Response) {
	const id = req.params.id;
	const uid = req.uid;
	try {
		const hospitalDB = await HospitalModel.findById(id);

		if (!hospitalDB) {
			return res.status(404).json({
				ok: false,
				msg: "Hospital no encontrado por id",
			});
		}

		const cambiosHospital = {
			...req.body,
			usuario: uid,
		};

		const hospitalActualizado = await HospitalModel.findByIdAndUpdate(
			id,
			cambiosHospital,
			{ new: true }
		);

		return res.json({
			ok: true,
			hospital: hospitalActualizado,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function borrarHospital(req: Request, res: Response) {
	const id = req.params.id;

	try {
		const hospitalDB = await HospitalModel.findById(id);

		if (!hospitalDB) {
			return res.status(404).json({
				ok: false,
				msg: "Hospital no encontrado por id",
			});
		}

		await HospitalModel.findByIdAndDelete(id);

		return res.json({
			ok: true,
			msg: "Hospital Eliminado",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
