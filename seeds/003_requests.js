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
          request_time: '09:15 am',
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
        },
        {
          user_id: 1,
          dog_id: 5,
          request_date: '2019/02/02',
          request_time: '08:00 pm',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 6,
          request_date: '2018/12/09',
          request_time: '07:55 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 7,
          request_date: '2018/10/22',
          request_time: '03:00 pm',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 8,
          request_date: '2019/01/05',
          request_time: '10:05 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 9,
          request_date: '2019/01/15',
          request_time: '06:45 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 10,
          request_date: '2019/02/21',
          request_time: '09:00 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 11,
          request_date: '2019/02/09',
          request_time: '07:55 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 12,
          request_date: '2018/04/28',
          request_time: '11:35 am',
          walker_id: null,
        },
        {
          user_id: 1,
          dog_id: 13,
          request_date: '2019/03/05',
          request_time: '10:15 am',
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
