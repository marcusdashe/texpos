import dbConfig from "../config/db.config"
import { Sequelize } from "sequelize"
import tutorialModel from './tutorial.model'

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: <any> dbConfig.dialect,
    
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
})

interface Db {
    Sequelize: any,
    sequelize: any,
    tutorials: any
}
const db: Db = {
    Sequelize : Sequelize,
    sequelize : sequelize,
    tutorials : tutorialModel(sequelize, Sequelize)
}

export default db