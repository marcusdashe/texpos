"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorial_controller_1 = require("../controllers/tutorial.controller");
const router = express_1.default.Router();
const TutorialHandler = new tutorial_controller_1.TutorialController();
const routes = (app) => {
    // Create a new Tutorial
    router.post("/", TutorialHandler.create);
    // Retrieve all tutorials
    router.get("/", TutorialHandler.findAll);
    // Retrieve all published Tutorials
    router.get("/published", TutorialHandler.findAllPublished);
    // Retrieve a single Tutorial with ID
    router.get("/:id", TutorialHandler.findOne);
    // Update a Tutorial with ID
    router.put("/:id", TutorialHandler.update);
    //Delete a Tutorial with id
    router.delete("/:id", TutorialHandler.delete);
    // Delete all Tutorials
    router.delete("/", TutorialHandler.deleteAll);
    app.use("/api", router);
};
exports.default = routes;
