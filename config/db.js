/* packages */
const mongoose = require('mongoose');
const { DB_NAME, DATABASE_URL } = process.env;

const url = DATABASE_URL || `mongodb://127.0.0.1:27017/${DB_NAME}`;

// DB Connection Start
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Database connected successfully');
  })
  .catch(err => console.log(err));
