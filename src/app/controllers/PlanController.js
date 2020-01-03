import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const plans = await Plan.findAll({ order: ['id'] });
        return res.json(plans);
    }

    async store(req, res) {
        const { title, duration, price } = req.body;
        const plan = await Plan.create({ title, duration, price });
        return res.json(plan);
    }

    async update(req, res) {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) {
            return res.status(400).json({ message: 'Plan not found' });
        }
        await plan.update(req.body);
        return res.json(plan);
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) {
            return res.status(400).json({ message: 'Plan not found' });
        }
        await plan.destroy();
        return res.status(204).json();
    }
}

export default new PlanController();
