const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const availableTrains = [
  { id: 1, name: 'Train A', capacity: 100 },
  { id: 2, name: 'Train B', capacity: 150 },
];

const bookedTickets = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/trains', (req, res) => {
  res.json(availableTrains);
});

// Endpoint to book a ticket
app.post('/book', (req, res) => {
  const { trainId, passengerName } = req.body;
  const train = availableTrains.find((t) => t.id === trainId);

  if (!train) {
    return res.status(404).json({ message: 'Train not found' });
  }

  if (train.capacity <= 0) {
    return res.status(400).json({ message: 'Train is fully booked' });
  }

  if (!bookedTickets[trainId]) {
    bookedTickets[trainId] = [];
  }

  if (bookedTickets[trainId].length >= train.capacity) {
    return res.status(400).json({ message: 'Train is fully booked' });
  }

  bookedTickets[trainId].push(passengerName);
  train.capacity--;

  res.json({ message: 'Ticket booked successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});