exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dogs').del()
    .then( () => {
      // Inserts seed entries
      return knex('dogs').insert([
        {
          id: 1,
          user_id: 1,
          dog_name: 'Aquila',
          dog_age: 1,
          dog_size: 1,
        },
        {
          id: 2,
          user_id: 2,
          dog_name: 'Bacon',
          dog_age: 5,
          dog_size: 5,
        },

      ]);
    });
};

// id PK
// user_id FK
// dog_name
// dog_age
// dog_size
