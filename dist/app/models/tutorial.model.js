"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });
    return Tutorial;
};
