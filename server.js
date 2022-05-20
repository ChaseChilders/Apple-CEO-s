const http = require("http");
const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const data = require("./data");

const hostname = "localhost";
const port = 3001;

const app = express();
const server = http.createServer(app);

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");
const partials = {
  head: "partials/head",
  foot: "partials/foot",
};

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.render("home", {
    partials,
    locals: {
      title: "Home",
    },
  });
});

app.get("/ceos", (req, res) => {
  res.render("ceo-list", {
    partials,
    locals: {
      ceos: data.ceos,
      title: "CEO's",
    },
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
