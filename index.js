// const express = require('express');
// const fs = require('fs');
// const Fuse = require('fuse.js');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Read states and capitals data from the JSON file
// let statesAndCapitals = {};
// fs.readFile('statesAndCapitals.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading statesAndCapitals.json:', err);
//         return;
//     }
//     statesAndCapitals = JSON.parse(data);
    
//     // Log state names for debugging
//     console.log('Loaded states:', Object.keys(statesAndCapitals));
// });

// // Read state facts data from the JSON file
// let stateFacts = {};
// fs.readFile('stateFacts.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading stateFacts.json:', err);
//         return;
//     }
//     stateFacts = JSON.parse(data);
// });

// // Prepare state names for fuzzy search
// const stateNames = Object.keys(statesAndCapitals);
// const fuse = new Fuse(stateNames, {
//     includeScore: true,
//     threshold: 0.3, // Lower threshold means stricter matches
// });

// // Function to get capital and fact based on user query
// const getCapital = (query) => {
//     const normalizedQuery = query.trim().toLowerCase(); // Normalize query
//     console.log(`Query received: "${normalizedQuery}"`); // Debugging

//     // Perform fuzzy search
//     const searchResults = fuse.search(normalizedQuery);
    
//     console.log(`Fuse results: ${JSON.stringify(searchResults)}`); // Debugging

//     if (searchResults.length > 0) {
//         const bestMatch = searchResults[0].item; // Get the best matching state
//         console.log(`Best match found: ${bestMatch}`); // Debugging
//         return { capital: statesAndCapitals[bestMatch], fact: stateFacts[bestMatch] };
//     }
//     return null;
// };

// app.use(express.json());
// app.use(express.static('public'));

// // Endpoint to handle state capital queries
// app.post('/ask', (req, res) => {
//     const query = req.body.query;
//     const result = getCapital(query);

//     if (result) {
//         res.json({ response: `The capital of ${query} is ${result.capital}. ${result.fact}` });
//     } else {
//         res.status(404).json({ error: 'State not found in your query. Please check the state name.' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // Load states data from JSON file
// let statesData = [];
// fs.readFile('states.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading states data:', err);
//     return;
//   }
//   statesData = JSON.parse(data).states;
// //   console.log('Loaded states:', statesData.map(state => state.name));
// });

// // Handle root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Handle ask route
// app.post('/ask', (req, res) => {
//   const query = req.body.query.toLowerCase();
//   console.log('Query received:', query);

//   // Find matching state
//   const foundState = statesData.find(state => 
//     state.name.toLowerCase().includes(query)
//   );

//   if (foundState) {
//     res.json({
//       name: foundState.name,
//       capital: foundState.capital,
//       facts: foundState.facts
//     });
//   } else {
//     res.json({ error: 'State not found in your query. Please check the state name.' });
//   }
// });

// // Handle 404 for unknown routes
// app.use((req, res) => {
//   res.status(404).send('404 Not Found: The requested resource could not be found.');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const natural = require('natural');

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // Load states data from JSON file
// let statesData = [];
// fs.readFile('states.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading states data:', err);
//     return;
//   }
//   statesData = JSON.parse(data).states;
// //   console.log('Loaded states:', statesData.map(state => state.name));
// });

// // Handle root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Handle ask route
// app.post('/ask', (req, res) => {
//   const query = req.body.query.toLowerCase();
//   console.log('Query received:', query);

//   // NLP logic to understand variations of questions
//   const tokenizer = new natural.WordTokenizer();
//   const words = tokenizer.tokenize(query);
//   const stateName = words.find(word => 
//     statesData.some(state => state.name.toLowerCase().includes(word))
//   );

//   if (stateName) {
//     const foundState = statesData.find(state => 
//       state.name.toLowerCase() === stateName.toLowerCase()
//     );

//     if (foundState) {
//       res.json({
//         name: foundState.name,
//         capital: foundState.capital,
//         facts: foundState.facts
//       });
//     } else {
//       res.json({ error: 'State not found in your query. Please check the state name.' });
//     }
//   } else {
//     res.json({ error: 'Invalid query format. Please ask a question like "What is the capital of Bihar?"' });
//   }
// });

// // Handle 404 for unknown routes
// app.use((req, res) => {
//   res.status(404).send('404 Not Found: The requested resource could not be found.');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// // Load the data from the JSON file
// const dataPath = path.join(__dirname, 'states.json');
// const stateData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// // Function to find capital and additional information
// function findCapital(stateName) {
//     const state = stateData.states.find(s => s.name.toLowerCase() === stateName.toLowerCase());
//     if (state) {
//         return {
//             capital: state.capital,
//             population: state.population,
//             area: state.area,
//             languages: state.languages.join(', '),
//             fact: state.fact
//         };
//     }
//     return null;
// }

// // NLP Function to process queries
// function processQuery(query) {
//     const words = tokenizer.tokenize(query.toLowerCase());
//     const stateNames = stateData.states.map(state => state.name.toLowerCase());
    
//     for (const word of words) {
//         if (stateNames.includes(word)) {
//             return word; // Return the first matching state name
//         }
//     }
//     return null;
// }

// // Route for homepage
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Route for handling user queries
// app.post('/ask', (req, res) => {
//     const query = req.body.query;
//     const stateName = processQuery(query);

//     if (stateName) {
//         const info = findCapital(stateName);
//         if (info) {
//             return res.json({ 
//                 message: `The capital of ${stateName} is ${info.capital}.`,
//                 details: {
//                     Population: info.population,
//                     Area: info.area,
//                     Languages: info.languages,
//                     Fact: info.fact
//                 }
//             });
//         } else {
//             return res.status(404).json({ message: 'State not found.' });
//         }
//     }
    
//     return res.status(400).json({ message: 'No state mentioned in the query.' });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const { NlpManager } = require('node-nlp');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Load the state data
// const data = JSON.parse(fs.readFileSync('./states.json'));

// // Initialize NLP Manager
// const nlpManager = new NlpManager({ languages: ['en'] });

// // Add states as entities
// const states = data.map(item => item.state);
// states.forEach(state => {
//     nlpManager.addDocument('en', `What is the capital of ${state}`, 'capital.query');
//     nlpManager.addDocument('en', `${state} capital`, 'capital.query');
//     nlpManager.addDocument('en', `capital of ${state}`, 'capital.query');
//     nlpManager.addDocument('en', `Tell me about ${state}`, 'state.info');
// });

// // Add answers for the queries
// states.forEach(state => {
//     const capital = data.find(item => item.state === state).capital;
//     nlpManager.addAnswer('en', 'capital.query', `The capital of ${state} is ${capital}.`);
// });

// // Process the user query
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public'))); // Updated to include public folder

// app.post('/ask', async (req, res) => {
//     const query = req.body.query;
//     console.log(`Query received: "${query}"`);

//     // Process the query using the NLP manager
//     try {
//         const result = await nlpManager.process('en', query);
//         const stateName = result.entities.find(entity => entity.entity === 'state')?.option || null;

//         if (stateName) {
//             const info = data.find(item => item.state.toLowerCase() === stateName.toLowerCase());
//             if (info) {
//                 return res.json({
//                     message: `The capital of ${stateName} is ${info.capital}.`,
//                     details: {
//                         Population: info.population,
//                         Area: info.area,
//                         Languages: info.languages.join(', '),
//                         Fact: info.fact
//                     }
//                 });
//             } else {
//                 return res.status(404).json({ message: 'State not found.' });
//             }
//         } else {
//             return res.status(400).json({ message: 'State not recognized in the query.' });
//         }
//     } catch (err) {
//         console.error('Error processing query:', err);
//         return res.status(400).json({ message: 'Could not process the query.' });
//     }
// });

// // Handle root route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });







const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Load state data from the JSON file
let statesData = [];
fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }
  statesData = JSON.parse(data).states;
//   console.log('Loaded states:', statesData.map(state => state.name));
});

// Endpoint to handle queries
app.post('/ask', (req, res) => {
  const query = req.body.query.toLowerCase();
  console.log('Query received:', query);
  
  // Extract state name from query
  const state = statesData.find(s => query.includes(s.name.toLowerCase()));
  
  if (state) {
    res.json({
      state: state.name,
      capital: state.capital,
      languages: state.official_languages,
      facts: state.facts,
      area: state.area,
      population: state.population
    });
  } else {
    const messages = [
        "Oops! That state seems to have gone on a vacation. Please check your query!",
        "Looks like that state is playing hide and seek! Double-check your spelling?",
        "Uh-oh! I can't find that state. Is it hiding under a rock?",
        "That state isn't in my database. It's still mastering the art of geography!",
        "Hmm, I don’t recognize that state. It might be a new one still waiting for a name!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    res.status(404).json({ error: randomMessage });
  }
});

// Serve index.html on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

