const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from the front-end folder (one level up)
app.use(express.static(path.join(__dirname, '../front-end')));

// In-memory user storage (mock auth)
const users = [];

// Sign Up Route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  res.status(201).json({ message: 'Signup successful' });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user });
});

app.post('/api/reservations', (req, res) => {
  const { confirmationNumber, customer, flight, passengers, seats } = req.body;

  // Logic to save reservation into your database or further processing

  console.log('Received Reservation:', { confirmationNumber, customer, flight, passengers, seats });

  // Respond with a success message
  res.status(201).json({ message: 'Reservation confirmed' });
});

// Catch-all route (optional) for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ VisitAir backend running at http://localhost:${PORT}`);
});