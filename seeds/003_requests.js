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
          start_walk_time: '2018-10-09 09:00:18.680108-07',
          finish_walk_time: '2018-10-09 09:30:18.680108-07',
          walker_id: 2,
        },
        {
          user_id: 1,
          dog_id: 2,
          request_date: '2018/12/09',
          request_time: '07:00 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 3,
          request_date: '2018/12/25',
          request_time: '11:11 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 4,
          request_date: '2019/01/18',
          request_time: '10:00 am',
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
