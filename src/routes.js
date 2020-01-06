import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import userStoreValidation from './app/validations/userStore';
import userUpdateValidation from './app/validations/userUpdate';
import sessionStoreValidation from './app/validations/sessionStore';
import studentStoreValidation from './app/validations/studentStore';
import studentUpdateValidation from './app/validations/studentUpdate';
import planStoreValidation from './app/validations/planStore';
import registrationStoreValidation from './app/validations/registrationStore';
import helpOrderStoreValidation from './app/validations/helpOrderStore';
import answerStoreValidation from './app/validations/answerStore';

import authMiddleware from './app/middlewares/authMiddleware';

const routes = Router();

routes.post('/users', userStoreValidation, UserController.store);
routes.post('/session', sessionStoreValidation, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', userUpdateValidation, UserController.update);

routes.post('/students', studentStoreValidation, StudentController.store);
routes.put('/students/:id', studentUpdateValidation, StudentController.update);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.post(
    '/students/:id/help-orders',
    helpOrderStoreValidation,
    HelpOrderController.store
);

routes.get('/help-orders', AnswerController.index);
routes.post(
    '/help-orders/:id/answer',
    answerStoreValidation,
    AnswerController.store
);

routes.get('/plans', PlanController.index);
routes.post('/plans', planStoreValidation, PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.post(
    '/registrations',
    registrationStoreValidation,
    RegistrationController.store
);
routes.put(
    '/registrations',
    registrationStoreValidation,
    RegistrationController.update
);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
