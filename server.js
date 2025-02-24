const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.get('/sales', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://wax.api.atomicassets.io/atomicmarket/v2/sales?state=1&collection_name=alien.worlds&data.shine=Stone&limit=100&order=asc&sort=price&page=${page}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      status: error.response ? error.response.status : null,
      details: error.response ? error.response.data : null
    });
  }
});

app.get('/prices', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(
      `https://wax.api.atomicassets.io/atomicmarket/v1/prices?collection_name=alien.worlds&limit=500&sort=min&order=asc&page=${page}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      status: error.response ? error.response.status : null,
      details: error.response ? error.response.data : null
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});