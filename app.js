const express = require("express");
const hbs = require("hbs");

const app = express(); // aqui estamos instanciando o pacote do express

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(`${__dirname}/views/partials`);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () =>
  console.log("MyPetPlaces running! :D")
);