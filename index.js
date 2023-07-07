
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');

const port = 3001; 
app.use(cors());
app.use(bodyParser.json());
function formatResponse(responseText) {
  
 
    var paragraphs = responseText.split('\n');
  
    var formattedResponse = paragraphs.map(function(paragraph) {
      return paragraph;
    }).join('<br><br>');
  
    return formattedResponse;
  }

// API endpoint
app.post('/openai', async (req, res) => {
  const { age, gender, problem,days,mstatus,dislikes,mins,likes} = req.body;


  const prompt = `Take the following information about me and create a custom mental health plan. I am ${age} old and ${gender}. I need help with ${problem} that I’m suffering from the past ${days} days and ${mstatus} for this issue.
  I absolutely don't like ${dislikes}.
  I can spend ${mins} mins per day on the activities only & I enjoy ${likes}.
  Create a 7-day routine for my mental health and happiness. Create a detailed program for my happiness. Create a detailed regimen for me to follow every day and mention the number of mins I need to spend on each activity. Keep a variety on each day for me to pick and choose. Mention at least 3 activities daily for me. Please exclude any activities that I specifically mention I don't like or have indicated a strong dislike towards. The activities should not be boring. Don't repeat the activity more than once in 1 week. Avoid any superfluous pre and post-descriptive text. Don't break character under any circumstance.
  `;
  console.log(prompt);

  try {
 
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt,
      max_tokens: 3000,
      temperature: 0.6,
   
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KEY}` // Replace with your OpenAI API key
       
      }
    });

   
     
    res.json(formatResponse( response.data.choices[0].text ));
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
