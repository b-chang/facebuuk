const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Established a connection to the database'))
  .catch((err) =>
    console.log('Something went wrong when connecting to the database', err)
  );
