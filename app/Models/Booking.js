'use strict'

const Model = use('Model')

class Booking extends Model {
  static get table () {
    return 'bookings'
  }

  static get primaryKey () {
    return 'id'
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
  barbecue () {
    return this.belongsTo('App/Models/Barbecue')
  }
  hours () {
    return this.hasMany('App/Models/Hour')
  }
}

module.exports = Booking
