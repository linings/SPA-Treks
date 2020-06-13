import extend from '../utils/extend.js';
import models from '../models/index.js';
import { success, error } from '../utils/notifications.js';

export default {
  get: {
    login(context) {
      extend(context).then(function () {
        this.partial('../views/user/login.hbs');
      });
    },
    register(context) {
      extend(context).then(function () {
        this.partial('../views/user/register.hbs');
      });
    },
    logout(context) {
      models.user.logout().then((response) => {
        context.redirect('#/home');
        success(`Logout successful!`);
      });
    },
  },
  post: {
    login(context) {
      let { email, password } = context.params;

      models.user
        .login(email, password)
        .then((response) => {
          context.redirect('#/home');
          success(`Successfully logged user!`);
        })
        .catch((err) =>
          error(
            `Invalid credentials!Please retry your request with correct credentials!`
          )
        );
    },
    register(context) {
      let { email, password, rePassword } = context.params;

      models.user
        .register(email, password)
        .then((response) => {
          context.redirect('#/user/login');
          success(`Successfully registered user!`);
        })
        .catch((err) => console.log(err));
    },
  },
};
