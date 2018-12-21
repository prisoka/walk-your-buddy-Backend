const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then( () => {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_type: 'user',
          email: 'user@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'Priscilla',
          last_name: 'User',
          phone_number: process.env.MY_PHONE_NUMBER,
          address_one: '44 Tehama Street',
          address_two: '3rd floor',
          zip: 94105
        },
        {
          user_type: 'walker',
          email: 'walker@gmail.com',
          password: bcrypt.hashSync('priscilla'),
          first_name: 'Rodrigo',
          last_name: 'Walker',
          phone_number: 5105105511,
          address_one: '44 Tehama Street',
          address_two: '5th floor',
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
