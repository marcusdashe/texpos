"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialController = void 0;
const models_1 = __importDefault(require("../models"));
const Tutorial = models_1.default.tutorials;
const Op = models_1.default.Sequelize.Op;
class TutorialController {
    // create new tutorial
    create(req, res) {
        if (!req.body.title) {
            res.status(400).json({ message: "Content cannot be empty" });
            return;
        }
        const tutorial = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false,
        };
        // Save Tutorial in the database
        Tutorial.create(tutorial)
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the tutorial.",
            });
        });
    }
    // Delete an existing tutorial by specific id
    delete(req, res) {
        const id = req.params.id;
        Tutorial.destroy({
            where: { id: id },
        })
            .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            }
            else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
            .catch((err) => {
            res.status(500).send({
                message: `Could not delete Tutorial with id = ${id}`,
            });
        });
    }
    // Retrieve all Tutorials from the database
    findAll(req, res) {
        const title = req.query.title;
        var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        Tutorial.findAll({ where: condition })
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving tutorials",
            });
        });
    }
    // Update a Tutorial by the id in the request
    update(req, res) {
        const id = req.params.id;
        Tutorial.update(req.body, {
            where: { id: id },
        })
            .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Tutorial was updated successfully",
                });
            }
            else {
                res.send({
                    messsage: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found.`,
                });
            }
        })
            .catch((err) => {
            res.status(500).send({
                message: `Error updating tutorial with id = ${id}`,
            });
        });
    }
    // Find a single Tutorial with an id
    findOne(req, res) {
        const id = req.params.id;
        Tutorial.findByPk(id)
            .then((data) => {
            if (data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    message: `Cannot find tutoriaal with id = ${id}.`,
                });
            }
        })
            .catch((err) => {
            res.status(500).send({
                message: `Error retrieving the Tutorial with id = ${id}`,
            });
        });
    }
    // Delete all Tutorials from the database
    deleteAll(req, res) {
        Tutorial.destroy({
            where: {},
            truncate: false,
        })
            .then((nums) => {
            res.json({ message: `${nums} Tutorials were deleted successfully!` });
        })
            .catch((err) => {
            res.status(500).json({
                message: err.message || " Some error occured while removing all tutorials.",
            });
        });
    }
    //   find all published tutorials
    findAllPublished(req, res) {
        Tutorial.findAll({ where: { published: true } })
            .then((data) => {
            res.send(data);
        })
            .catch((err) => {
            res.status(500).json({
                message: err.message || "Some error occured while retrieving tutorials.",
            });
        });
    }
}
exports.TutorialController = TutorialController;
