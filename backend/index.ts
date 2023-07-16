const express = require("express");
const app = express();
const port = 3000;
const users = require("./controllers/userController");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/users", users);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
