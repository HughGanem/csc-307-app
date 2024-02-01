import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUsersByCriteria = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    let result = findUsersByCriteria(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const addUser = (user) => {
  const randomId = generateRandomId();
  const userWithId = { ...user, id: randomId };
  users["users_list"].push(userWithId);
  return userWithId;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).json(addedUser);
});

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params["id"];
  deleteUser(userToDelete);
  res.status(204).send("Deletion Successful");
});

const deleteUser = (body) => {
  users["users_list"] = users["users_list"].filter(function (obj) {
    return obj.id !== body;
  });
};

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});