const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT =process.env.PORT || 5333;

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
app.get('/prediction/earthquake/:district',async (req, res) => {
  try{
    const { district } = req.params;
    const earthquakeMagnitude = getRandomValue(predictionData.earth_quake_magnitude);
    return res.status(200).json({ district, earthquakeMagnitude });
  }catch(error){
    res.status(500).json({ error: error.message})
  }
});

// Endpoint to get landslide size and flooding size prediction for a district
app.get('/prediction/landslide_flooding/:district', async(req, res) => {
  try{
  const { district } = req.params;
  const landslideSize = getRandomValue(predictionData.landslide_size);
  const floodingSize = getRandomValue(predictionData.flooding_size);
  return res.status(200).json({ district, landslideSize, floodingSize }); 
  }catch(error){
  res.status(500).json({ error: error.message})
}
});

// Generate random value from array (mock function)
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
