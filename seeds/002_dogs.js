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
        },
        {
          user_id: 1,
          dog_name: 'Rolls',
          dog_age: 7,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/aaron-andary-358414-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Oreo',
          dog_age: 5,
          dog_size: 'medium',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/baptist-standaert-346832-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Buddy',
          dog_age: 1,
          dog_size: 'small',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/berkay-gumustekin-402114-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Rex',
          dog_age: 3,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/courtney-roberson-621693-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Jon Snow',
          dog_age: 4,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/marek-szturc-508923-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Mia',
          dog_age: 5,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/mia-phoy-558468-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Goofy',
          dog_age: 3,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/reuben-mcfeeters-351103-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Caramel',
          dog_age: 5,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/ryan-walton-520633-unsplash.jpg'
        },
        {
          user_id: 1,
          dog_name: 'Soneca',
          dog_age: 4,
          dog_size: 'large',
          dog_photo_url: process.env.REACT_APP_API_URL + '/images/valerie-elash-690673-unsplash.jpg'
        }
      ]);
    });
};

// id PK
// user_id FK
// dog_name
// dog_age
// dog_size
