exports.up = function(knex, Promise) {
  return knex.schema.createTable('accepted_reqs', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.integer('request_id').references('requests.id').onDelete('CASCADE').index().notNullable();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index().notNullable();
    table.integer('dog_id').references('dogs.id').onDelete('CASCADE').index().notNullable();
    table.integer('walker_id').references('users.id').onDelete('CASCADE').index().notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accepted_reqs')
}

// id PF
// request_id FK
// user_id FK
// dog_id FK
// walker_id FK
