import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
    async index(req, res) {
        const { id } = req.params;
        const helpOrders = await HelpOrder.findAll({
            where: { student_id: id },
        });
        return res.json(helpOrders);
    }

    async store(req, res) {
        const { id: student_id } = req.params;
        const { question } = req.body;
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.status(400).json({ message: 'Student not found.' });
        }
        const helpOrder = await HelpOrder.create({ student_id, question });
        return res.json(helpOrder);
    }
}

export default new HelpOrderController();
