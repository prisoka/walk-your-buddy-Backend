exports.up = function(knex, Promise) {
  return knex.schema.createTable('walkers', (table) => {
    // table.uuid('id').primary();
    table.increments().primary();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.bigInteger('phone_number').notNullable();
    table.text('address_one').notNullable();
    table.text('address_two');
    table.integer('zip').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('walkers')
}

// id PK
// email - string (NN)
// password - text (NN)
// first_name - text (NN)
// last_name - text (NN)
// phone_number - number (NN)
// address_one - text (NN)
// address_two - text
// zip - number (NN)
// date - date time
