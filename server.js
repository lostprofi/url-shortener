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

// solution for CORS

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['Content-Type', 'x-auth-token']);
  next();
});

app.use('/auth', require('./routes/auth'));
app.use('/registration', require('./routes/reg'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/shortener', require('./routes/shortener'));
app.use('/redir', require('./routes/redir'));
app.use('/addDesc', require('./routes/addDesc'));
app.use('/addTag', require('./routes/addTag'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
