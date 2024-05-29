const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5003;

// Mock prediction data for demonstration
const predictionData = {
  "landslide_size": [30, 40, 50, 60, 70, 80, 90, 100],
  "flooding_size": [20, 30, 40, 50, 60, 70, 80, 90],
  "earth_quake_magnitude": [4.5, 5.0, 5.5, 6.0, 6.5, 7.0]
};

// Enable CORS
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

// Endpoint to get earthquake magnitude prediction for a district
app.get('/prediction/earthquake/:district', (req, res) => {
  const { district } = req.params;
  const earthquakeMagnitude = getRandomValue(predictionData.earth_quake_magnitude);
  res.json({ district, earthquakeMagnitude });
});

// Endpoint to get landslide size and flooding size prediction for a district
app.get('/prediction/landslide_flooding/:district', (req, res) => {
  const { district } = req.params;
  const landslideSize = getRandomValue(predictionData.landslide_size);
  const floodingSize = getRandomValue(predictionData.flooding_size);
  res.json({ district, landslideSize, floodingSize });
});

// Generate random value from array (mock function)
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
