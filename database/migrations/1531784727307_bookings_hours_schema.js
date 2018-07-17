'use strict'

const Schema = use('Schema')

class BookingsHoursSchema extends Schema {
  up () {
    this.create('bookings_hours', (table) => {
      table.increments()
      table.dateTime('date').notNullable()
      table.integer('booking_id').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('bookings_hours')
  }
}

module.exports = BookingsHoursSchema
