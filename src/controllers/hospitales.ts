import { Request, Response } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { HospitalModel, Hospital } from "../models/hospital";

export async function getHospitales(req: Request, res: Response) {
	const hospitales: DocumentType<Hospital>[] = await HospitalModel.find().populate(
		"usuario",
		"nombre img"
	);

	try {
		return res.json({
			ok: true,
			hospitales,
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
	const hospital: DocumentType<Hospital> = new HospitalModel({
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
	res.json({
		ok: true,
		msg: "Put Hospital",
	});
}
export async function borrarHospital(req: Request, res: Response) {
	res.json({
		ok: true,
		msg: "Delete Hospital",
	});
}
