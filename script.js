document.getElementById('mentalHealthForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const problem = document.getElementById('problem').value;
    const days = document.getElementById('days').value;
    const mstatus = document.getElementById('mstatus').value;
    const dislikes = document.getElementById('dislikes').value;
    const mins = document.getElementById('mins').value;
    const likes = document.getElementById('likes').value;
    // Add more field variables as needed
  
    try {
      const response = await fetch('http://localhost:3001/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          age,
          gender,
          problem,
          days,
          mstatus,
          dislikes,
          mins,
          likes
          // Pass more field values here
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        displayResponse(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      displayError('Something went wrong');
    }
  });
  
  function displayResponse(response) {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = `<p> <strong >I have created this routine plan for you.Follow this routine for coming days and I hope you will feel better❤️‍🩹</strong>${response}</p>`;
  }
  
  function displayError(message) {
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.innerHTML = `<p>Error: ${message}</p>`;
  }
  