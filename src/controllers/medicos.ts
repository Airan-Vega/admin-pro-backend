import { Request, Response } from "express";
import { DocumentType } from "@typegoose/typegoose";
import { MedicoModel, Medico } from "../models/medico";

export async function getMedicos(req: Request, res: Response) {
	const medicos = await MedicoModel.find()
		.populate("usuario", "nombre img")
		.populate("hospital", "nombre img");

	try {
		return res.json({
			ok: true,
			medicos,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function crearMedico(req: Request, res: Response) {
	const uid = req.uid;
	const medico: DocumentType<Medico> = new MedicoModel({
		usuario: uid,
		...req.body,
	});

	try {
		const medicoDB = await medico.save();
		return res.json({
			ok: true,
			medico: medicoDB,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function actualizarMedico(req: Request, res: Response) {
	res.json({
		ok: true,
		msg: "Put Medico",
	});
}
export async function borrarMedico(req: Request, res: Response) {
	res.json({
		ok: true,
		msg: "Delete Medico",
	});
}
