const express = require("express");
const app = express();
const port = 3000;
const users = require("./routes/controllers/userController");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "This is a REST API application made with Express.",
      license: {
        name: "Licensed Under MIT",
        url: "https://github.com/joosecj/MRBlog-express",
      },
      contact: {
        name: "Jose Carlos",
        url: "https://github.com/joosecj",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/controllers/*/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
