const middleware = {
  render404page(req, res) {
    res.status(404).render("404");
  }
};

module.exports = middleware;

