const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/presets', require('./controllers/presets'));

app.use('/gql', require('./utils/gql'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
