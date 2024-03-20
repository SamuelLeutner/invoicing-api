const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModel');

class UserRepository {
  constructor() {
    this.userModelInitializer = new UserModel();
    this.init();
  }

  async init() {
    this.userModel = await this.userModelInitializer.model();
  }

  async login(res, { email, password }) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return res.status(404).send({
          error: 'Users not found.'
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).send({
          error: 'The password is incorrect.'
        });
      }

      user.api_token = uuid.v4();
      await user.save();

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Internal server error.'
      });
    }
  }

  async store(res, user) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const existingUser = await this.userModel.findOne({ email: user.email });

      if (existingUser) {
        return res.status(409).send({
          error: 'Email is already in use.'
        });
      }

      const data = await this.userModel.create(user);

      return res.status(201).send({ user: data });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Internal server error.'
      });
    }
  }

  async findApiToken(res, apiToken) {
    return await this.userModel.findOne({ api_token: apiToken });
  }

  async findUserForChangePassword(res, email) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not fund.' });
      }

      user.reset_password_token = uuid.v4();
      user.reset_password_expires = Date.now() + 3600000; // 1 hour
      await user.save();

      return {
        name: user.name, email: user.email, token: user.reset_password_token
      };
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Internal server error.'
      });
    }
  }

  async changePassword(res, token, newPassword) {
    try {
      const user = await this.userModel.findOne({ reset_password_token: token });

      if (!user) {
        return res.status(400).json({ message: "Invalid token." });
      }

      if (user.reset_password_expires <= Date.now()) {
        return res.status(400).json({ message: "Expired token. Please request a new one." });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      user.reset_password_token = undefined;
      user.reset_password_expires = undefined;
      await user.save();

      return res.json({
        message: 'Password redefine with success.',
        user: user
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        error: 'Internal server error.'
      });
    }
  }
}

module.exports = UserRepository;
