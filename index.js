require('dotenv').config();
const PORT = process.env.PORT || 8000;
const app = require('./app/server');

module.exports = app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});
