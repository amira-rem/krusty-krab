exports.menuPage = (req, res) => {
  res.render("menu", { title: "Krusty Krab Menu" });
};

exports.loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.adminPage = (req, res) => {
  res.render("admin", { title: "Admin" });
};
