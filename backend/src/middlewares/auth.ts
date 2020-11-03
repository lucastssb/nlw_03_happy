import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
const authConfig = require('../config/auth');

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).send({ error: 'No token provided' });
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2) {
        return response.status(401).send({ error: 'Token error'});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({ error: 'Token poorly formatted'});
    }

    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if(err) {
            return response.status(401).send({ error: 'Invalid token' });
        }

        request.headers.userId = decoded.id;
        return next();
    });
    
}