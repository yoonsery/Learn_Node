import express from 'express';

const app = express();

app.use(express.json());

app.post('/posts', (req, res, next) => {
  console.log(req.body);
  res.status(201).send('Thanks, Created');
  next();
});

app.put('/posts/:id', (req, res) => {
  console.log(req.body);
  res.status(200).send('Thanks, Updated!');
});

app.listen(8080);
