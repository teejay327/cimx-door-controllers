const submitButton = document.querySelector('.button');
const user = document.querySelector('.text-display');
const userName = document.getElementById('username');
const password = document.getElementById('password');

submitButton.addEventListener('click',(e) => {
  user.textContent = `Your username is ${userName.value} and your password is ${password.value}`;
});
