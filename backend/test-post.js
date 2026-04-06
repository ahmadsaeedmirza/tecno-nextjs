const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTUwOTY1NGFlOGE1YWU0NTk2NzhjZSIsImlhdCI6MTc3NTQ2OTE0NiwiZXhwIjoxNzc2MzMzMTQ2fQ.hN-8Uv4SBCClTxuXTzuI6nj9Vi9fXU4v22nGDbI2wwzfQ';

const form = new FormData();
form.append('name', 'Test Category ' + Date.now());
form.append('description', 'Test Description');
form.append('imageCover', fs.createReadStream('public/img/favicon.png'));

axios.post('http://localhost:8000/api/v1/catagories', form, {
  headers: {
    ...form.getHeaders(),
    'Authorization': 'Bearer ' + token
  }
}).then(res => {
  console.log('STATUS:', res.status);
  console.log('DATA:', res.data);
}).catch(err => {
  console.error('ERROR STATUS:', err.response?.status);
  console.error('ERROR DATA:', err.response?.data);
});
