"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "12345678",
    DB: "tsexpo",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
