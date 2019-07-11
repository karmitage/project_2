module.exports = function (sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
        message_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sender_id: DataTypes.INTEGER,
        recipient_id: DataTypes.INTEGER,
        created_at: {
            type: "TIMESTAMP",
            allowNull: false
        },
        updated_at: {
            type: "TIMESTAMP",
            allowNull: false
        }
    });
    return Chat;
};