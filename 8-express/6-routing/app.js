import express from 'express';
import postRouter from './router/post.js';
import userRouter from './router/user.js';

const app = express();

app.use(express.json());

app.use('/posts', postRouter);
app.use('/users', userRouter);

/*
app
  .route('/posts')
  .get((req, res, next) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });
*/
app.listen(8080);
