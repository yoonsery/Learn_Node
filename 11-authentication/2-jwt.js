const jwt = require('jsonwebtoken');

const secret = '3H5anIHK]%0}3ixU7)s1n$(05jJk)GT5';

const token = jwt.sign(
  {
    id: 'ona',
    isAdmin: false,
  },
  secret,
  { expiresIn: 2 } // 2초안에 만료
);

console.log(token);

setTimeout(() => {
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);
  });
}, 3000);
