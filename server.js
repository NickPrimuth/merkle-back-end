const express = require('express');
const env = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Router
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Send to user router
app.use('/user', userRouter);

// config file
env.config({ path: './config/config.env' });

// DB connect
const mongoDbConnect = async () => {
  const connected = await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to MongoDB `))
    .catch((e) => console.log(e));
};
mongoDbConnect();

/* Url Routes */

// Serve all the files for the built React app
app.get('/', (req, res) => res.json('Hello from the back end'));

// Route handler for unknown routes
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
