exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.integer('user_id').references('users.id').onDelete('CASCADE').index();
    table.text('dog_name').notNullable();
    table.integer('dog_age').notNullable();
    table.integer('dog_size').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dogs')
}

// id PK
// user_id FK
// dog_name
// dog_age
// dog_size
