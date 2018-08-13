exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dogs').del()
    .then( () => {
      // Inserts seed entries
      return knex('dogs').insert([
        {
          user_id: 1,
          dog_name: 'Aquila',
          dog_age: 1,
          dog_size: 'small',
          dog_photo_url: 'http://localhost:3000/images/aquila.JPG'
        },
        {
          user_id: 1,
          dog_name: 'Bacon',
          dog_age: 5,
          dog_size: 'large',
          dog_photo_url: 'http://localhost:3000/images/fernanda-soares-668153-unsplash.jpg'
        }
      ]);
    });
};

// id PK
// user_id FK
// dog_name
// dog_age
// dog_size
