// hash_generator.js
const bcrypt = require('bcrypt');

const senha = 'SenhaAdmin123';
const saltRounds = 10;

bcrypt.hash(senha, saltRounds)
  .then(hash => {
    console.log('Hash gerado:');
    console.log(hash);
  })
  .catch(err => console.error(err));