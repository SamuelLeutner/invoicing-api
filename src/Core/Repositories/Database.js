const mongoose = require('mongoose');

class SetDatabase {
  async database(DatabaseName, DatabaseSchema) {
    const uri = await this.getPath();
    const connection = mongoose.createConnection(uri, (err) => {
      if (err) throw err;
    });

    return connection.model(DatabaseName, DatabaseSchema);
  }

  async getPath() {
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const db = process.env.MONGODB_DB;

    const hostTest = process.env.MONGODB_TEST_HOST;
    const portTest = process.env.MONGODB_TEST_PORT;
    const dbTest = process.env.MONGODB_TEST_DB;

    if (process.env.APP_ENV === 'test') {
      return `mongodb://${hostTest}:${portTest}/${dbTest}`;
    }

    return `mongodb://${host}:${port}/${db}`;
  }
}

module.exports = SetDatabase;
