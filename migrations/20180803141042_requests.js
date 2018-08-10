exports.up = function(knex, Promise) {
  return knex.schema.createTable('requests', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index().notNullable();
    table.integer('dog_id').references('dogs.id').onDelete('CASCADE').index().notNullable();
    table.date('request_date').notNullable();
    table.time('request_time').notNullable();
    table.integer('walker_id').references('users.id').onDelete('CASCADE').index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('requests')
}

// id
// user_id
// dog_id
// request_date
// request_time
// walker_id
