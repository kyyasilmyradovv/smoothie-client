const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const referralRoutes = require('./routes/referralRoutes');
const chatRoutes = require('./routes/chatRoutes');

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', referralRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
