'use strict'

const Schema = use('Schema')

class BookingsSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.increments()
      table.date('date').notNullable().unique()
      table.integer('user_id').notNullable()
      table.integer('barbecues_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingsSchema
