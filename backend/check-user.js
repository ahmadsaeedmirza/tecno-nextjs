const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModels');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(async () => {
  console.log('DB connection successful!');
  
  const email = 'ahmadsaeedas023@gmail.com';
  const user = await User.findOne({ email }).select('+password');
  
  if (user) {
    console.log('User found:');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Has Password:', !!user.password);
  } else {
    console.log('User not found.');
  }
  
  process.exit();
}).catch(err => {
  console.error('DB Connection Error:', err);
  process.exit(1);
});
