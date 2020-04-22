const express = require('express');
const config = require('config');
const connectDB = require('./config/dataBase');

const app = express();
const PORT = config.get('serverPort');

connectDB();


app.get('/', (req, res) => {
  res.send('Server started on port 5000');
});

app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/registration', require('./routes/reg'));
app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/shortener'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
