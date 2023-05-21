const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
});

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    surname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    fathersName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
    //  hasPaid:{ type: DataTypes.BOOLEAN, allowNull: false },
});

const Payment = sequelize.define('payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateStart: { type: DataTypes.DATEONLY, allowNull: false },
    sum: { type: DataTypes.FLOAT, allowNull: false },
});

const Rental = sequelize.define('rental', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateStart: { type: DataTypes.DATEONLY, allowNull: false },
    dateEnd: { type: DataTypes.DATEONLY, allowNull: false },
});

const Ship = sequelize.define('ship', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    length: { type: DataTypes.INTEGER, allowNull: false },
    priceSummer: { type: DataTypes.INTEGER, allowNull: false },
    priceWinter: { type: DataTypes.INTEGER, allowNull: false },
    parkingNumber: { type: DataTypes.INTEGER, allowNull: false },
   
});

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

Type.hasMany(Ship);
Ship.belongsTo(Type);

Client.hasMany(Rental, { onDelete: 'CASCADE' });
Rental.belongsTo(Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Ship.hasMany(Rental, { onDelete: 'CASCADE' });
Rental.belongsTo(Ship, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Rental.hasMany(Payment, { onDelete: 'CASCADE' });
Payment.belongsTo(Rental, { onDelete: 'CASCADE' });

Payment.belongsTo(Client, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Client.hasMany(Payment, { onDelete: 'CASCADE' });


Type.hasMany(Ship)
Ship.belongsTo(Type)

Client.hasMany(Rental, { onDelete: 'CASCADE' })
Rental.belongsTo(Client,  { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Ship.hasMany(Rental,{ onDelete: 'CASCADE' })
Rental.belongsTo(Ship,  { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Rental.hasMany(Payment)
Payment.belongsTo(Rental)

Payment.belongsTo(Client,  { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Client.hasMany(Payment, { onDelete: 'CASCADE' })

Payment.belongsTo(Ship, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Ship.hasMany(Payment, { onDelete: 'CASCADE' })


module.exports = {
    User,
    Client,
    Rental,
    Type,
    Ship,
    Payment, 

}