const express = require(`express`);
const birthControl = require(`./api/birthControl`);

const app = express();

app.get(`/`, (req, res) => {
  res.send(`Hello, world!!`);
});

app.get(`/api/v1/birthcontrol`, (req, res) => {
  birthControl().then(msgs => res.send(msgs));
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${port}!`)
);
