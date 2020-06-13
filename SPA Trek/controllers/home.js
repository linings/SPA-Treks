import extend from '../utils/extend.js';
import models from '../models/index.js';

export default {
  get: {
    // home(context) {
    //   extend(context).then(function () {
    //     this.partial('../views/home/home.hbs');
    //   });
    // },

    trecks(context) {
      models.treck
        .getAll()
        .then((response) => {
          const trecks = response.docs.map((d) => {
            return { ...d.data(), id: d.id };
          });

          context.trecks = trecks;

          extend(context).then(function () {
            this.partial('../views/home/home.hbs');
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
