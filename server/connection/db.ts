import {Sequelize} from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import Spces from '../models/Specs';

dotenv.config()





export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Product, User, Order, Spces] 

})


User.hasMany(Order, {
    onDelete : 'CASCADE',
    foreignKey : 'userId'
})
Order.belongsTo(User, {
    foreignKey : 'userId'
})


Product.hasOne(Spces, {
    onDelete : 'CASCADE'
})
Spces.belongsTo(Product, {
    onDelete : 'CASCADE'
})