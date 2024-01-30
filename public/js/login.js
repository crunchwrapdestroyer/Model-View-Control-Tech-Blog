const loginHandler = async function (e) {
    // Prevent the default form submission behavior
    e.preventDefault()

    const usernameEl = document
        .getElementById('username-input-login')
        .value.trim();
    const passwordEl = document
        .getElementById('password-input-login')
        .value.trim();

    const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl,
      password: passwordEl,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('Sending data:', { username: usernameEl, password: passwordEl });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginHandler)