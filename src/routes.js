import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import userStoreValidation from './app/validations/userStore';
import userUpdateValidation from './app/validations/userUpdate';
import sessionStoreValidation from './app/validations/sessionStore';
import studentStoreValidation from './app/validations/studentStore';
import studentUpdateValidation from './app/validations/studentUpdate';

import authMiddleware from './app/middlewares/authMiddleware';

const routes = Router();

routes.post('/users', userStoreValidation, UserController.store);
routes.post('/session', sessionStoreValidation, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', userUpdateValidation, UserController.update);
routes.post('/students', studentStoreValidation, StudentController.store);
routes.put('/students/:id', studentUpdateValidation, StudentController.update);

export default routes;
