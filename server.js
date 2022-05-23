const http = require("http");
const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const data = require("./data");

const hostname = "localhost";
const port = 3001;
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/ceos/:slug", (req, res) => {
  const ceo = data.ceos.find((ceo) => ceo.slug === req.params.slug);
  if (!ceo) {
    res.status(404).send("Could not find that CEO");
  }
  res.render("ceo-details", {
    partials,
    locals: {
      ceo,
      title: `${ceo.name}'s Profile`,
    },
  });
});

app.get("/ceos/search", (req, res) => {
  const ceo = data.ceos.find((ceo) => ceo.name === req.params.slug);
  if (!ceo) {
    res.status(404).send("Could not find that CEO");
  }
  res.render("ceo-details", {
    partials,
    locals: {
      ceo,
      title: `${ceo.name}'s Profile`,
    },
  });
});

app.post("/search", (req, res) => {
  let name = req.body.name;
  res.send(`You sent me the ${name} `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
