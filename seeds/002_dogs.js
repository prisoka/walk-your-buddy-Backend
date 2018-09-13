const env = process.env.NODE_ENV

if(env === 'production'){
  require('dotenv').config({path: './.env.production'});
} else {
  require('dotenv').config({path: './.env.development'});
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dogs').del()
    .then( () => {
      // Inserts seed entries
      return knex('dogs').insert([
        {
          user_id: 1,
          dog_name: 'Aquila',
          dog_age: 6,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/aquila.JPG'
        },
        {
          user_id: 1,
          dog_name: 'Bacon',
          dog_age: 5,
          dog_size: 'small',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/fernanda-soares-668153-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Bolacha',
          dog_age: 4,
          dog_size: 'medium',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/florencia-potter-566712-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Peanut Butter',
          dog_age: 2,
          dog_size: 'small',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/mink-mingle-323378-unsplash.jpg'
        }
      ]);
    });
};

// id PK
// user_id FK
// dog_name
// dog_age
// dog_size
