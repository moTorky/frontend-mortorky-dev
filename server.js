const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const backendUrl = process.env.API_URL || 'http://backend:8080';

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PROXY /api → backend
app.get('/api', async (req, res) => {
  try {
    const response = await fetch(`${backendUrl}/api`);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Error contacting backend: " + err);
  }
});

app.listen(port, () => console.log(`Frontend running on port ${port}`));
