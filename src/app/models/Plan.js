import Sequelize, { Model } from 'sequelize';
import { zonedTimeToUtc } from 'date-fns-tz';

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                duration: Sequelize.INTEGER,
                price: Sequelize.INTEGER,
                createdAt: {
                    type: Sequelize.DATE,
                    get() {
                        const dateText = this.getDataValue('createdAt');
                        return zonedTimeToUtc(dateText, '+00:00');
                    },
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    get() {
                        const dateText = this.getDataValue('updatedAt');
                        return zonedTimeToUtc(dateText, '+00:00');
                    },
                },
            },
            { sequelize }
        );
        return this;
    }
}

export default Plan;
