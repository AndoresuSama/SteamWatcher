const { readFile, writeFile } = require("fs/promises");

class DB {
  static async getFile() {
    return readFile('src/backend/db/db.json');
  }
  static async write(data) {
    await writeFile('src/backend/db/db.json', data);
  }
}

module.exports = {
  DB
}