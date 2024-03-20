const service = require('../Services/UserService.js');

const instanceUserService = new service();

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    return await instanceUserService.login(res, { email, password });
  }

  async store(req, res) {
    const { name, email, password, passwordConfirmation } = req.body;

    return await instanceUserService.store(res, { name, email, password, passwordConfirmation });
  }

  async sendChangePassword(req, res) {
    const { email } = req.body;

    return await instanceUserService.sendChangePassword(res, email)
  }

  async changePassword(req, res) {
    const { token } = req.params;
    const { newPassword, newPasswordConfirmation } = req.body;

    return await instanceUserService.changePassword(res, { token, newPassword, newPasswordConfirmation })
  }
}

module.exports = UserController;
