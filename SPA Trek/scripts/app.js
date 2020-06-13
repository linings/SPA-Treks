import controllers from '../controllers/index.js';

let app = Sammy('#root', function () {
  this.use('Handlebars', 'hbs');
  // HOME
  this.get('#/home', controllers.home.get.trecks);
  // this.get('#/home', controllers.home.get.home);

  // USER
  this.get('#/user/login', controllers.user.get.login);
  this.get('#/user/register', controllers.user.get.register);

  this.post('#/user/register', controllers.user.post.register);
  this.post('#/user/login', controllers.user.post.login);

  this.get('#/user/logout', controllers.user.get.logout);

  //TRECKS
  this.get('#/treck/create', controllers.treck.get.create);
  this.post('#/treck/create', controllers.treck.post.create);

  this.get('#/treck/getTreck/:treckId', controllers.treck.get.getTreck);
  this.get('#/treck/edit/:treckId', controllers.treck.get.editTreck);
  this.post('#/treck/edit', controllers.treck.post.edit);
  this.get('#/treck/close/:treckId', controllers.treck.post.close);

  this.get('#/treck/mine', controllers.treck.get.mine);
  this.get('#/treck/like/:treckId', controllers.treck.post.like);
});

(() => {
  app.run('#/home');
})();
