import { create } from "domain";
import express, { Express } from "express";
import { TutorialController } from "../controllers/tutorial.controller";
const router = express.Router();

const TutorialHandler = new TutorialController();

const routes = (app: Express) => {
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

export default routes;
