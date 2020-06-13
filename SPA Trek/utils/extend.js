export default function (context) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      context.isLoggedIn = true;
      context.username = user.email;
      context.userId = user.uid;

      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.uid);
    } else {
      context.isLoggedIn = false;
      context.username = null;
      context.userId = null;

      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
    }
  });
  return context.loadPartials({
    header: '../views/common/header.hbs',
    footer: '../views/common/footer.hbs',
  });
}
