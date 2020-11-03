import { Request, Response} from "express";
import { getRepository } from "typeorm";

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

}