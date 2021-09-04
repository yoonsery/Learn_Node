import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 미들웨어로 넘어가기
  }
  return res.status(400).json({ message: errors.array() });
};

app.post(
  '/users',
  [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('more than 2 for name'),
    body('age').isInt().withMessage('please enter a number'),
    body('email').isEmail().withMessage('enter an email').normalizeEmail(),
    body('job.name').notEmpty(),
    validate,
  ],
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  [param('email').isEmail().withMessage('이메일 입력해요'), validate],
  (req, res, next) => {
    res.send('💌');
  }
);

app.listen(8080);
