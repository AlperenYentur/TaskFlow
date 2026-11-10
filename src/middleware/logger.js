const fs = require('fs');
const path = require('path');

const logFolder = path.join(__dirname, '../../logs');
const logFile = path.join(logFolder, 'requests.log');

function logger(req, res, next) {
  const time = new Date().toISOString();
  const log = `[${time}] ${req.method} ${req.originalUrl}`;

  console.log(log);

  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
  fs.appendFileSync(logFile, log + '\n');

  next();
}

module.exports = logger;
