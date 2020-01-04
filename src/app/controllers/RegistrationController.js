import { addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';
import ChangeOfInscriptionMail from '../jobs/ChangeOfInscriptionMail';

class RegistrationController {
    async index(req, res) {
        const registration = await Registration.findAll({ order: ['id'] });
        return res.json(registration);
    }

    async store(req, res) {
        const { student_id, plan_id, start_date } = req.body;
        const searchRegistration = await Registration.findOne({
            where: {
                student_id,
            },
        });
        if (searchRegistration) {
            return res.status(400).json({
                message: 'There is already a registration for this student',
            });
        }
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }
        const plan = await Plan.findByPk(plan_id);
        if (!plan) {
            return res.status(400).json({ message: 'Plan not found' });
        }
        const end_date = addMonths(start_date, plan.duration);
        const price = plan.price * plan.duration;
        const registration = await Registration.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });
        await Queue.add(RegistrationMail.key, { registration, student, plan });
        return res.json(registration);
    }

    async update(req, res) {
        const { student_id, plan_id, start_date } = req.body;
        const registration = await Registration.findOne({
            where: {
                student_id,
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title'],
                },
            ],
        });
        if (!registration) {
            return res.status(400).json({ message: 'Registration not found' });
        }
        const plan = await Plan.findByPk(plan_id);
        if (!plan) {
            return res.status(400).json({ message: 'Plan not found' });
        }
        const end_date = addMonths(start_date, plan.duration);
        const price = plan.price * plan.duration;

        await registration.update({
            plan_id,
            start_date,
            end_date,
            price,
        });
        await Queue.add(ChangeOfInscriptionMail.key, { registration, plan });
        return res.json(registration);
    }

    async delete(req, res) {
        const registration = await Registration.findByPk(req.params.id);
        if (!registration) {
            return res.status(400).json({ message: 'Registration not found' });
        }
        await registration.destroy();
        return res.status(204).json();
    }
}

export default new RegistrationController();
