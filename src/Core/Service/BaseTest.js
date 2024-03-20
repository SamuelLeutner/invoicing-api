const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../../Domain/Users/Models/UserModel.js');

const userModelInstance = new UserModel();

class BaseTest {
  async user(userData) {
    const User = await userModelInstance.userModel();

    const apiToken = uuid.v4();
    userData.api_token = apiToken
    userData.password = await bcrypt.hash(userData.password, 10);

    const newUser = new User(userData);

    const savedUser = await newUser.save();

    return savedUser;
  }
}

module.exports = BaseTest