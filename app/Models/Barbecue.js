'use strict'

const Model = use('Model')

class Barbecue extends Model {
  static get table () {
    return 'barbecues'
  }

  static get primaryKey () {
    return 'id'
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  bookings () {
    return this.belongsTo('App/Models/Booking')
  }
}

module.exports = Barbecue