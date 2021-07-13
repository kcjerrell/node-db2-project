exports.up = function (knex) {
  return knex.schema
    .createTable('cars', table => {
      table.increments('id')
      table.text('vin', 17)
        .unique()
        .notNullable()
      table.text('make', 40)
        .notNullable()
      table.text('model', 40)
        .notNullable()
      table.decimal('mileage')
        .notNullable()
      table.text('title', 60)
      table.text('transmission', 20)
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('cars')
};
