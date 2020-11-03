import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

const authConfig = require('../config/auth');


export default {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const usersRepository = getRepository(User);

        const data = {
            name,
            email,
            password
        };

        //Data validation
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(8)
        });

        await schema.validate(data, {
            abortEarly: false,
        });


        try {
            //Verify of the user exists
            if (await usersRepository.findOne({ where: { email: email } })) {
                return response.status(400).send({ error: 'User already exists' });
            };

            //Add the new user to the database
            const user = usersRepository.create(data);

            usersRepository.save(user);

            return response.send('Okay');
        } catch (err) {
            return response.send(400).send({ error: 'Registration failed' });
        }


    },

    async login(request: Request, response: Response) {
        const { email, password } = request.body;
        const usersRepository = getRepository(User);
        let user: User;

        const data = {
            email,
            password
        };

        //Data validation
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required().min(8)
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        try {
            //Look for the user in the database
            user = await usersRepository.findOneOrFail({ where: { email } });
        } catch {
            return response.status(401).send("User not found");
        }

        //Verify if the password is correct
        if (!await bcrypt.compare(password, user.password)) {
            return response.status(401).send("Password is incorrect");
        }

        user.password = '';

        //Generate the token
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        return response.send({ user, token });

    }
};