const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const port = 8000;
require('dotenv').config();
const { CLIENT_ORIGIN } = require('./config');
const { PORT } = require('./config');

console.log('test')
console.log('HELLO', CLIENT_ORIGIN)
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: CLIENT_ORIGIN }));

require('./config/mongoose.config');
require('./routes/routes.config')(app);

app.listen(PORT, () => {
  console.log(
    chalk.red.bold(`🚀 🚀 🚀 Server is listening on port ${PORT} 🚀 🚀 🚀 `)
  );
});