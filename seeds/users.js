const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'pris@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'priscilla',
          last_name: 'priscilla',
          phone_number: '5105105511',
          address_one: '44 tehama street',
          address_two: '',
          zip: 94105
        }
      ]);
    });
};


// id PK
// dog_id FK (<<< NOK >>>)
// email - string (NN)
// password - text (NN)
// first_name - text (NN)
// last_name - text (NN)
// phone_number - number (NN)
// address_one - text (NN)
// address_two - text
// zip - number (NN)
// date - date time
