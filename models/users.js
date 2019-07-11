module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 25]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            isEmail: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: "TIMESTAMP",
            allowNull: false
        },
        updated_at: {
            type: "TIMESTAMP",
            allowNull: false
        }
    });
    return User;
};