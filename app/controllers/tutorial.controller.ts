import { Request, Response } from "express";
import db from "../models";

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

export class TutorialController {
  // create new tutorial
  public create(req: Request, res: Response) {
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
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: { message: string }) => {
        res.status(500).send({
          message:
            err.message || "Some error occured while creating the tutorial.",
        });
      });
  }

  // Delete an existing tutorial by specific id
  public delete(req: Request, res: Response) {
    const id = req.params.id;

    Tutorial.destroy({
      where: { id: id },
    })
      .then((num: number | string) => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
          });
        }
      })
      .catch((err: { message: string }) => {
        res.status(500).send({
          message: `Could not delete Tutorial with id = ${id}`,
        });
      });
  }

  // Retrieve all Tutorials from the database
  public findAll(req: Request, res: Response) {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
      .then((data: Object | Array<Object>) => {
        res.send(data);
      })
      .catch((err: { message: string }) => {
        res.status(500).send({
          message:
            err.message || "Some error occured while retrieving tutorials",
        });
      });
  }

  // Update a Tutorial by the id in the request
  public update(req: Request, res: Response) {
    const id = req.params.id;

    Tutorial.update(req.body, {
      where: { id: id },
    })
      .then((num: string | number) => {
        if (num == 1) {
          res.json({
            message: "Tutorial was updated successfully",
          });
        } else {
          res.send({
            messsage: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found.`,
          });
        }
      })
      .catch((err: { message: string }) => {
        res.status(500).send({
          message: `Error updating tutorial with id = ${id}`,
        });
      });
  }

  // Find a single Tutorial with an id
  public findOne(req: Request, res: Response) {
    const id = req.params.id;

    Tutorial.findByPk(id)
      .then((data: Object | Array<Object>) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find tutoriaal with id = ${id}.`,
          });
        }
      })
      .catch((err: { message: string }) => {
        res.status(500).send({
          message: `Error retrieving the Tutorial with id = ${id}`,
        });
      });
  }

  // Delete all Tutorials from the database
  public deleteAll(req: Request, res: Response) {
    Tutorial.destroy({
      where: {},
      truncate: false,
    })
      .then((nums: number | string) => {
        res.json({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch((err: { message: string }) => {
        res.status(500).json({
          message:
            err.message || " Some error occured while removing all tutorials.",
        });
      });
  }

  //   find all published tutorials
  public findAllPublished(req: Request, res: Response) {
    Tutorial.findAll({ where: { published: true } })
      .then((data: Object | Array<Object>) => {
        res.send(data);
      })
      .catch((err: { message: string }) => {
        res.status(500).json({
          message:
            err.message || "Some error occured while retrieving tutorials.",
        });
      });
  }
}
