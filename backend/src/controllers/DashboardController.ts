import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from 'yup';

import Orphanage from "../models/Orphanage";
import orphanageView from '../view/orphanages_view';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        //Load all orphanages from the database
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        //Return all orphanages
        return response.json(orphanageView.renderMany(orphanages));
    },

    async delete(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const { id } = request.params;

        try {
            await orphanagesRepository.delete(id);
            return response.status(200).json({ message: 'Delete operation successful' });
        } catch (error) {
            return response.status(400).json({ message: 'Error deleting orphanage', error: error });
        }
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        try {
            const orphanage = await orphanagesRepository.update(id, data);
            return response.sendStatus(200).json(orphanage);
        }catch(error) {
            return response.sendStatus(500).json({message: 'Error updating orphanage', error: error});
        }

    },

}