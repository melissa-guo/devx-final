const express = require("express");
const app = express();
const axios = require("axios");
const cors = require('cors');

app.use(cors());  
app.use(express.json());

app.get('/api/places', async (req, res) => {
    const {keyword } = req.query;
    const city = 'Los Angeles';
    const API_KEY = '5ae2e3f221c38a28845f05b6aaa19118fb279a34f53119b62ad36922';

    if (!keyword) {
        return res.status(400).json({ error: "City and keyword are required." });
    }

    try {
        const geocodeResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname`, {
            params: { name: city, apikey: API_KEY },
        });

        const { lat, lon } = geocodeResponse.data;

        const placesResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
            params: {
                lat: lat,
                lon: lon,
                radius: 10000, 
                kinds: keyword, 
                apikey: API_KEY,
            },
        });

        if (!placesResponse.data.features || placesResponse.data.features.length === 0) {
            return res.status(404).json({ error: 'No results found for the specified keyword and location.' });
        }

        res.json(placesResponse.data.features); 
    } catch (error) {
        console.error('Error fetching data from OpenTripMap:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || 'Failed to fetch data from OpenTripMap.' });
    }    
});

const PORT = 5001; 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
