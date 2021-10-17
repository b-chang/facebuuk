const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const port = 8000;
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(express.urlencoded({ extended: true }));


require('./config/mongoose.config');
require('./routes/routes.config')(app);

app.listen(port, () => {
  console.log(
    chalk.red.bold(`🚀 🚀 🚀 Server is listening on port ${port} 🚀 🚀 🚀 `)
  );
});