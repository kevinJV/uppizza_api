'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.text("pizzas").notNullable()
      table.text("tamanios").notNullable()
      table.text("precios").notNullable()
      table.text("charge_id").notNullable()
      table.string("estado", 25).defaultTo('En preparacion')
      table.text("nToken").notNullable()
      table.text("usuario").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
