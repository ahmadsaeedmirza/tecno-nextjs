const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModels');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB).then(async () => {
  console.log('DB connection successful!');
  
  const email = 'ahmadsaeedas023@gmail.com';
  const name = 'Ahmad Saeed';
  const password = 'password123'; // Temporary password
  
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword: password,
      role: 'admin'
    });
    console.log('Admin user created successfully!');
    console.log('Email:', newUser.email);
    console.log('Password (temp):', password);
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
  
  process.exit();
}).catch(err => {
  console.error('DB Connection Error:', err);
  process.exit(1);
});
