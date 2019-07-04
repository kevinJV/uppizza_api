'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PizzaSchema extends Schema {
  up () {
    this.create('pizzas', (table) => {
      table.increments()
      table.timestamps()
      table.string('nombre', 50).notNullable()
      table.text('ingredientes')
      table.string('imagen', 255).notNullable()
      table.integer('precio_id').unsigned().references('id').inTable('precios'),
      table.boolean('show_card').defaultTo(false)
    })
  }

  down () {
    this.drop('pizzas')
  }
}

module.exports = PizzaSchema
