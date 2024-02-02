const newPost = async function (e) {
    e.preventDefault()

    const title = document.getElementById("post-title").value
    const body = document.getElementById("post-body").value
    console.log("Title:", title);
    console.log("Body:", body);
  
      await fetch('/api/users/newpost', {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  }
        
        // document.location.replace('/dashboard');
document    
    .getElementById('new-post-form')
    .addEventListener('submit', newPost)

