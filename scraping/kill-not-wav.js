'use strict';
import fs from 'fs';
import path from 'path';

const dir = process.argv[2] || './';
const files = fs.readdirSync(dir);

for (const fileName of files) {
  if (!fileName.match(/\.wav$/)) fs.unlinkSync(path.join(dir, fileName))
  //fs.removeSync()
}