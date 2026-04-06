const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModels');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(async () => {
  const email = 'ahmadsaeedas023@gmail.com';
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found');
    process.exit(1);
  }
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  
  console.log('TOKEN:', token);
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
