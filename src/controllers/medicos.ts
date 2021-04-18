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
	const id = req.params.id;
	const uid = req.uid;

	try {
		const medicoDB = await MedicoModel.findById(id);
		if (!medicoDB) {
			return res.status(404).json({
				ok: false,
				msg: "Médico no encontrado por id",
			});
		}

		const cambioMedico = {
			...req.body,
			usuario: uid,
		};

		const medicoActualizado = await MedicoModel.findByIdAndUpdate(
			id,
			cambioMedico,
			{ new: true }
		);
		return res.json({
			ok: true,
			medico: medicoActualizado,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
export async function borrarMedico(req: Request, res: Response) {
	const id = req.params.id;

	try {
		const medicoDB = await MedicoModel.findById(id);

		if (!medicoDB) {
			return res.status(404).json({
				ok: false,
				msg: "Médico no encontrado por id",
			});
		}

		await MedicoModel.findByIdAndDelete(id);

		return res.json({
			ok: true,
			msg: "Médico Eliminado",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error inesperado, hable con el administrador",
		});
	}
}
