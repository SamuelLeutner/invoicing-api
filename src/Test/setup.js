const mongoose = require('mongoose');
const SetDatabase = require("../Core/Repositories/Database");

const database = new SetDatabase();

beforeAll(async () => {
  const mongoUri = await database.getPath();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
