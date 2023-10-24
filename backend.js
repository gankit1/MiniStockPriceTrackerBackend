// server/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sameeratlas:sameeratlaspass@cluster0.ynl9fbo.mongodb.net/stocktracker', { useNewUrlParser: true, useUnifiedTopology: true });

const stockPriceSchema = new mongoose.Schema({
  stock_name: String,
  stock_price: Number,
});

const Stock = mongoose.model('Stock', stockPriceSchema);

app.get('/api/stock_prices', async (req, res) => {
  try {
    const stocks = await Stock.find();
    const stockDataObj = {};
    console.log(stocks)
    stocks.forEach((stocks) => {
      stockDataObj[stocks.stock_name] = Math.random() * 100;
    });
    res.json(stockDataObj);
    // res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock prices' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
