import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const { name, email, age, weight, height } = req.body;
        const student = await Student.findOne({ where: { email } });
        if (student) {
            return res.status(400).json({
                message: 'Student already registered with this email',
            });
        }
        const { id } = await Student.create({
            name,
            email,
            age,
            weight,
            height,
        });
        return res.json({ id, name, email, age, weight, height });
    }

    async update(req, res) {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }
        if (req.body.email && req.body.email !== student.email) {
            const emailExist = await Student.findOne({
                where: { email: req.body.email },
            });
            if (emailExist) {
                return res
                    .status(400)
                    .json({ message: 'Studant already exists' });
            }
        }
        const { name, email, age, weight, height } = await student.update(
            req.body
        );
        return res.json({ id, name, email, age, weight, height });
    }
}
export default new StudentController();
