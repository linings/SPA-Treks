export function success(message) {
  let notificationContainer = document.createElement('div');
  notificationContainer.setAttribute('id', 'notifications');
  notificationContainer.innerHTML = `<div id="successBox" class="alert alert-success" role="alert">${message}</div>`;
  document.querySelector('body').prepend(notificationContainer);
  document.getElementById('successBox').style.display = 'block';

  setTimeout(() => {
    notificationContainer.remove();
  }, 4000);
}
export function login(message) {}
export function error(message) {
  let notificationContainer = document.createElement('div');
  notificationContainer.setAttribute('id', 'notifications');
  notificationContainer.innerHTML = `<div id="errorBox" class="alert alert-danger" role="alert">${message}</div>`;
  document.querySelector('body').prepend(notificationContainer);
  document.getElementById('errorBox').style.display = 'block';

  setTimeout(() => {
    notificationContainer.remove();
  }, 4000);
}

{
  /* <div id="notifications">
<div id="loadingBox" class="alert alert-info" role="alert">Loading...</div>
<div id="errorBox" class="alert alert-danger" role="alert">{Error Message...}</div>
</div> */
}
