function fetchGitHubDetails() {
    const username = document.getElementById('username').value;
    const detailsContainer = document.getElementById('details');
    
    // Make a GET request to the GitHub API
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        // Check if the API response contains an error
        if (data.message) {
          throw new Error(data.message);
        }
        
        // Extract the required details from the API response
        const name = data.name;
        const repositories = data.public_repos;
        const followers = data.followers;
        
        // Create the details HTML and update the container
        const detailsHTML = `
          <h2>${name}</h2>
          <p>Username: ${username}</p>
          <p>Repositories: ${repositories}</p>
          <p>Followers: ${followers}</p>
          <p>View profile: <a href="https://github.com/${username}" target="_blank">Link</a></p>
        `;
        detailsContainer.innerHTML = detailsHTML;

        // Save the username to local storage for history
        let history = localStorage.getItem('explorer_history') || '[]';
        history = JSON.parse(history);
        history.push(username);
        localStorage.setItem('explorer_history', JSON.stringify(history));
      })
      .catch(error => {
        console.error('Error:', error);
        detailsContainer.innerHTML = 'Failed to fetch user details.';
      });
  }
