'use strict'

const Model = use('Model')

class Hour extends Model {
  static get table () {
    return 'bookings_hours'
  }

  static get primaryKey () {
    return 'id'
  }
  booking () {
    return this.belongsTo('App/Models/Booking')
  }
}

module.exports = Hour;
