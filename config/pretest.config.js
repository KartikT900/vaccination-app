const fs = require('fs');
const opener = require('opener');

const file = 'coverage/index.html';

// eslint-disable-next-line no-sync
const fileExists = fs.existsSync(file);

if (fileExists) {
  opener(file);
}
