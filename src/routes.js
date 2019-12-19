import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import userStoreValidation from './app/validations/userStore';
import sessionStoreValidation from './app/validations/sessionStore';

const routes = Router();

routes.post('/users', userStoreValidation, UserController.store);
routes.post('/session', sessionStoreValidation, SessionController.store);

export default routes;
