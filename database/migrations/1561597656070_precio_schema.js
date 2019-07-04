'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PrecioSchema extends Schema {
  up () {
    this.create('precios', (table) => {
      table.increments()
      table.timestamps()
      table.string('pequenia', 10).notNullable()
      table.string('mediana', 10).notNullable()
      table.string('grande', 10).notNullable()
    })
  }

  down () {
    this.drop('precios')
  }
}

module.exports = PrecioSchema
