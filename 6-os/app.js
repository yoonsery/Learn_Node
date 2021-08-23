const os = require('os');

console.log(os.EOL === '\n'); // true for mac
console.log(os.EOL === '\r\n'); // true for window

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
