import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.json({ message: 'Hello Word GYMPOINT' });
});

export default routes;
