import User from '../models/User';

class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({
            where: { email },
        });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const { id } = await User.create({ name, email, password });
        return res.json({ id, name, email });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);
        if (email && email !== user.email) {
            const emailExist = await User.findOne({ where: { email } });
            if (emailExist) {
                return res.status(400).json({ message: 'User already exists' });
            }
        }
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const { id, name } = await user.update(req.body);
        return res.json({ id, name, email });
    }
}

export default new UserController();
