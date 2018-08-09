exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then( () => {
      // Inserts seed entries
      return knex('requests').insert([
        {
          user_id: 1,
          dog_id: 1,
          request_date: '2018/08/09',
          request_time: '09:00 pm',
          walker_id: 2,
        },
        {
          user_id: 1,
          dog_id: 2,
          request_date: '2018/08/09',
          request_time: '08:00 am',
          walker_id: 2,
        },
      ]);
    });
};

// id
// user_id
// dog_id
// request_date
// request_time
// walker_id
