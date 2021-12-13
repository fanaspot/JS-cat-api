const express = require("express");
const api = require("./api");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Example  listening at http://localhost:${port}`);
});

app.post("/api/images/search", async (req, res) => {
  const response = await api.get("/images/search/", {
    params: req.body,
  });

  res.send({
    photos: response.data,
    paginationCount: +response.headers["pagination-count"],
  });
});

app.get("/api/images/:id", async (req, res) => {
  const response = await api.get(`/images/${req.params.id}`);
  res.send({
    image: response.data,
  });
});

app.get("/api/categories", async (req, res) => {
  const response = await api.get(`/categories`);
  res.send(response.data);
});

app.get("/api/breeds", async (req, res) => {
  const response = await api.get(`/breeds`);
  res.send(response.data);
});
