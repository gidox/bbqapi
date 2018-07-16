'use strict'

const Model = use('Model')

class Barbecue extends Model {
  static get table () {
    return 'barbecues'
  }

  static get primaryKey () {
    return 'id'
  }
}

module.exports = Barbecue