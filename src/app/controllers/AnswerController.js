import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
    async index(req, res) {
        const help = await HelpOrder.findAll({
            where: {
                answer: null,
            },
        });
        return res.json(help);
    }

    async store(req, res) {
        const { id } = req.params;
        const { answer } = req.body;
        const helpOrder = await HelpOrder.findOne({
            where: { id },
            include: [{ model: Student, as: 'student' }],
        });
        await helpOrder.update({ answer, answer_at: new Date() });
        await Queue.add(HelpOrderAnswerMail.key, { helpOrder });
        return res.json(helpOrder);
    }
}

export default new AnswerController();
