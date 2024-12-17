require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authroute = require('./routers/authRoutes');
const restaurantrouter = require('./routers/restaurantRoutes');
const foodRoute = require('./routers/foodRoutes');

const app = express();
const PORT = process.env.PORT || 3040;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use("/api/auth",authroute);
app.use("/api/restaurants",restaurantrouter);
app.use("/api/foods",foodRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
