import { Router } from 'express';

import UserController from './app/controllers/UserController';

import userStoreValidation from './app/validations/userStore';

const routes = Router();

routes.post('/users', userStoreValidation, UserController.store);

export default routes;
