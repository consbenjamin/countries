const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/available', async (req, res) => {
try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
});

router.get('/info/:countryCode', async (req, res) => {
  const { countryCode } = req.params;

  if (!countryCode || countryCode.length !== 2) {
    return res.status(400).json({ error: 'Invalid country code. Please provide a valid ISO2 country code.' });
  }

  try {
    const [countryInfoResponse, populationResponse, flagResponse] = await Promise.all([
      axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`),
      axios.get(`https://countriesnow.space/api/v0.1/countries/population`),
      axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)
    ]);

    const countryInfo = countryInfoResponse.data;
    const countryName = countryInfo.commonName;

    const populationData = populationResponse.data.data.find(country =>
      country.country.toLowerCase() === countryName.toLowerCase()
    );

    if (!populationData) {
      return res.status(404).json({ error: 'Population data not found for this country.' });
    }

    const flagData = flagResponse.data.data.find(country => country.iso2 === countryCode);

    const result = {
      country: {
        name: countryInfo.commonName,
        officialName: countryInfo.officialName,
        borders: countryInfo.borders.map(border => border.commonName),
        population: populationData.populationCounts.map(count => ({
          year: count.year,
          population: count.value
        })),
        flag: flagData ? flagData.flag : 'No flag available'
      }
    };

    res.json(result);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

module.exports = router;
