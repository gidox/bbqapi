'use strict'

const Schema = use('Schema')

class BarbecuesSchema extends Schema {
  up () {
    this.create('barbecues', (table) => {
      table.increments(),
      table.string('title'),
      table.string('description'),
      table.float('lat'),
      table.float('lon'),

      table.integer('user_id'),
      table.integer('model'),
      
      table.timestamps()
    })
  }

  down () {
    this.drop('barbecues')
  }
}

module.exports = BarbecuesSchema
