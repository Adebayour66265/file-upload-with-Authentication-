const express = require('express');
const app = express();
const { connectDb } = require('./database/db');

const userRoutes = require('./routes/user');
const productRoute = require('./routes/product');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));


app.use('/api/user', userRoutes);
app.use('/api/product', productRoute);
const PORT = 5000;

app.listen(PORT, () => {
    console.log('Server is listing');
    connectDb();
})