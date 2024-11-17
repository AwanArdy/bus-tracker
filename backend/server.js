const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

const routes = [
  { id: 1, name: "Pelabuhan Pantoloan", lat: 0, lng: 1 },
  { id: 2, name: "Puskesmas Tawaeli", lat: 1, lng: 1 },
  { id: 3, name: "Puskesmas Kayumalue", lat: 2, lng: 1 },
  { id: 4, name: "Tondo 1", lat: 3, lng: 0 }
];

let currentIndex = 0;

app.get('/bus', (req, res) => {
  currentIndex = (currentIndex + 1) % routes.length;
  res.json({ position: routes[currentIndex] });
});

app.get('/routes', (req, res) => {
  res.json(routes);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
