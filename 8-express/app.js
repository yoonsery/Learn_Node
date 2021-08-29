import express from 'express';
const app = express();

app.get('/sky/:id', (req, res, next) => {
  // console.log(req.path);
  // console.log(req.headers);
  console.log(req.params);
  console.log(req.params.id);
  console.log(req.query);
  console.log(req.query.keyword);

  res.setHeader('key', 'value'); // header에 특정한 것을 설정해야 할 때 사용
  res.status(201).send('created');
  // res.json({ name: 'bolbol' });
  // res.sendStatus(400);
});

app.listen(8080);
