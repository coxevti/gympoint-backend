import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(conn) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
            },
            { conn }
        );
    }
}

export default User;
