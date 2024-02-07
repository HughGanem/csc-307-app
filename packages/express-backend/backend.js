import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;
  
  
  app.use(cors());
  app.use(express.json());
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
  
    if (name && job) {
      userServices.findUserByNameAndJob(name, job)
        .then((result) => {
          res.send({ users_list: result});
        })
        .catch((error) => {
          res.status(500).send("Internal Server Error");
        });
    } else {
      userServices.getUsers(name, job)
        .then((result) => {
          res.send({ users_list: result});
        })
        .catch((error) => {
          res.status(500).send("Internal Server Error");
        });
    }
  });
  
  app.get("/users/:id", (req, res) => {
    const id = req.params.id;
  
    userServices.findUserById(id)
      .then((result) => {
          res.send({ users_list: result});
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
  
    userServices.addUser(userToAdd)
      .then((addedUser) => {
        res.status(201).send(addedUser);
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });
  
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
  
    userServices.deleteUserById(id)
      .then((result) => {
        if (!result) {
          res.status(404).send("User not found");
        } else {
          res.status(204).end();
        }
      })
      .catch((error) => {
        res.status(500).send("Internal Server Error");
      });
  });