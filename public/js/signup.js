// Pseudocode for signupFormHandler function
const signupFormHandler = async function (e) {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Get the trimmed values of username and password from the input fields
    const usernameEl = document.getElementById('exampleInputEmail1').value.trim()
    const passwordEl = document.getElementById('exampleInputPassword1').value.trim()
    // const nameEl = document.getElementById('exampleName1').value.trim()
    // Log the entered username and password to the console
    // console.log('Name:', nameEl);
    console.log('Username:', usernameEl);
    console.log('Password:', passwordEl);
    // Check if the password is at least 8 characters long and a username is provided    
    if (passwordEl.length >= 8 && usernameEl) {
        // Make a POST request to the '/api/users' endpoint
        const response = await fetch('/api/users', {
            method: 'POST',
            // Convert the user data to JSON and include it in the request body
            body: JSON.stringify({
                username: usernameEl,
                password: passwordEl,
        }),
        // Set the 'Content-Type' header to 'application/json'
        headers: { 'Content-Type': 'application/json' },
        })
        // Check if the response status is OK (200)
        if (response.ok) {
        document.location.replace('/')
        } else {
                // If unsuccessful, show an alert indicating failure
                alert('Failed to sign up')
        }
    }    
}
// Attach the signupFormHandler function to the 'submit' event of the signup form
document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
