exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index().notNullable();
    table.integer('dog_id').references('dogs.id').onDelete('CASCADE').index().notNullable();
    table.datetime('booking_date').notNullable();
    table.datetime('booking_time').notNullable();
    table.integer('walker_id').references('users.id').onDelete('CASCADE').index().notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests')
}

// id
// user_id
// dog_id
// booking_date
// booking_time
