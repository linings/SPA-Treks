import extend from '../utils/extend.js';
import models from '../models/index.js';
export default {
  get: {
    create(context) {
      extend(context).then(function () {
        this.partial('../views/trecks/create.hbs');
      });
    },
    getTreck(context) {
      let { treckId } = context.params;

      models.treck
        .get(treckId)
        .then((response) => {
          let treck = response.data();
          treck = { ...treck, id: treckId };
          context.treck = treck;

          // Object.keys(treck).forEach((key) => {
          //   context[key] = treck[key];
          // });

          context.isCreator =
            treck.creator === localStorage.getItem('userEmail');

          sessionStorage.setItem('treckId', treckId);

          extend(context).then(function () {
            this.partial('../views/trecks/details.hbs');
          });
        })
        .catch((err) => console.log(err));
    },
    editTreck(context) {
      console.log(context);
      extend(context).then(function () {
        this.partial('../views/trecks/edit.hbs');
      });
    },
    mine(context) {
      let mineTrecks = [];
      models.treck.getAll().then((response) => {
        let trecks = response.docs.map((d) => {
          return { ...d.data() };
        });

        trecks.forEach((d) => {
          if (d.creator === localStorage.getItem('userEmail')) {
            mineTrecks.push(d);
          }
        });

        context.mineTrecks = mineTrecks;

        extend(context).then(function () {
          this.partial('../views/home/homeMyTrecks.hbs');
        });
      });
    },
  },
  post: {
    create(context) {
      let data = {
        ...context.params,
        likes: 0,
        creator: localStorage.userEmail,
      };

      models.treck.create(data).then((response) => {
        context.redirect('#/home');
      });
    },
    edit(context) {
      const treckId = sessionStorage.getItem('treckId');
      const { dateTime, description, imageURL, location } = context.params;

      models.treck.get(treckId).then((response) => {
        let treck = { ...response.data(), id: treckId };

        treck.dateTime = dateTime;
        treck.description = description;
        treck.imageURL = imageURL;
        treck.location = location;

        models.treck.edit(treckId, treck).then((response) => {
          context.redirect('#/home');
        });
      });
    },
    close(context) {
      const { treckId } = context.params;

      models.treck.close(treckId).then((response) => {
        context.redirect('#/home');
      });
    },
    like(context) {
      const { treckId } = context.params;

      models.treck
        .get(treckId)
        .then((response) => {
          let treck = response.data();

          treck.likes++;

          return models.treck.edit(treckId, treck);
        })
        .then(function () {
          context.redirect(`#/treck/getTreck/${treckId}`);
        });
    },
  },
};
