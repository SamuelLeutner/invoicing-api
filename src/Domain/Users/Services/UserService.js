const UserRepository = require('../Repositories/UserRepository.js');
const validator = require('validator');
const SendEmail = require('../../../Core/Service/EmailService.js');
const instanceRepository = new UserRepository();
const emailService = new SendEmail();

class UserService {
  async login(res, data) {
    const { email, password } = data;

    const userData = {
      email: email, password: password
    }

    return await instanceRepository.login(res, userData);
  }

  async store(res, data) {
    const { name, email, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      return res.status(404).send({
        error: 'The password and password confirmation do not match.'
      });
    }

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (email === '' || !emailRegex.test(email)) {
      return res.status(404).send({
        error: 'Invalid email format.'
      });
    }

    const userData = {
      name: name, email: email, password: password,
    }

    return await instanceRepository.store(res, userData);
  }

  async sendChangePassword(res, email) {
    if (!validator.isEmail(email)) {
      return res.status(404).json({ message: 'Invalid email format.' });
    }

    const user = await instanceRepository.findUserForChangePassword(res, email);

    const userData = {
      name: user.name,
      email: user.email,
      token: user.token
    };

    await emailService.sendEmail(userData)

    return res.status(200).send({
      message: 'Email send with success.',
      user: userData
    });
  }

  async changePassword(res, data) {
    const { token, newPassword, newPasswordConfirmation } = data;

    if (newPassword !== newPasswordConfirmation) {
      return res.status(404).send({
        error: 'The new password and new password confirmation do not match.'
      });
    }

    return await instanceRepository.changePassword(res, token, newPassword);
  }
}

module.exports = UserService;
