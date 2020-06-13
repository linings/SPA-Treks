import extend from '../utils/extend.js';
import models from '../models/index.js';

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
      });
    },
  },
  post: {
    login(context) {
      let { email, password } = context.params;

      models.user.login(email, password).then((response) => {
        context.redirect('#/home');
      });
    },
    register(context) {
      let { email, password, rePassword } = context.params;

      models.user
        .register(email, password)
        .then((response) => {
          context.redirect('#/user/login');
        })
        .catch((err) => console.log(err));
    },
  },
};
