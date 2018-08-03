exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index();
    table.integer('dog_id').references('dogs.id').onDelete('CASCADE').index();
    table.datetime('booking_time').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests')
}

// id
// user_id
// dog_id
// booking_time
