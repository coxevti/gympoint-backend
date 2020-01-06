import { startOfWeek, endOfWeek } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';

class CheckinController {
    async index(req, res) {
        const { id: student_id } = req.params;
        const checkin = await Checkin.findAll({
            where: {
                student_id,
            },
        });
        return res.json(checkin);
    }

    async store(req, res) {
        const { id: student_id } = req.params;
        const startWeek = startOfWeek(new Date());
        const endWeek = endOfWeek(new Date());
        const checkinCount = await Checkin.findAndCountAll({
            where: {
                student_id,
                created_at: { [Op.between]: [startWeek, endWeek] },
            },
        });
        if (checkinCount.count >= 5) {
            return res.status(401).json({
                message: 'Only 5 checkins allowed within a 7 day period.',
                count: checkinCount.count,
            });
        }
        await Checkin.create({ student_id });
        return res.json({ startWeek, endWeek, checkinCount });
    }
}

export default new CheckinController();
