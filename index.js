
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const port = 3001; 

app.use(bodyParser.json());
function formatResponse(responseText) {
   
    var paragraphs = responseText.split('\n');
  
    var formattedResponse = paragraphs.join('<br><br>');
  
    return formattedResponse;
  }
// API endpoint
app.post('/MercorSkillSync/openai', async (req, res) => {
  const { problem, goals, target_audience,unique_features,prefrences,employee_type} = req.body;


  const prompt = `I am planning to build a startup and it aims to solve the problem of ${problem}.The goal of my startup is ${goals} and my target audience is ${target_audience}, and it offers ${unique_features}. I have specific preferences for ${prefrences} technologies to be used, and I am looking for ${employee_type} employees to hire.Suggest me 4 names for my startup.
  Create a suggestion plan for my startup which sjould be cost-effective and efficient. Create a detailed program how can i work to start and build my startup company and what technologies should I use. While hiring what skills should I look for in candidates.Avoid any superfluous pre and post-descriptive text. Don't break character under any circumstance.
  
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

    
    //console.log({ response: response.data.choices[0].text });
     
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
