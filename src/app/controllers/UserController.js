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
}

export default new UserController();
