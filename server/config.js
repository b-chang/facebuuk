"use strict";

module.exports = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/fb_db",
  TEST_FACEBUUK_DATABASE: process.env.TEST_FACEBUUK_DATABASE || "mongodb://localhost/dream-catcher-test-db",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000'
}
