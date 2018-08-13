exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('requests').del()
    .then( () => {
      // Inserts seed entries
      return knex('requests').insert([
        {
          user_id: 1,
          dog_id: 1,
          request_date: '2018/10/09',
          request_time: '09:00 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 2,
          request_date: '2018/12/09',
          request_time: '07:00 am',
          walker_id: null,
        }
      ]);
    });
};

// id
// user_id
// dog_id
// request_date
// request_time
// walker_id
