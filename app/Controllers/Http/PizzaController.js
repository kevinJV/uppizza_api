'use strict'
const Pizza = use('App/Models/Pizza')
const Precio = use('App/Models/Precio')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pizzas
 */
class PizzaController {
  /**
   * Show a list of all pizzas.
   * GET pizzas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    let pizzas = await Pizza.all()

    for (let i in pizzas.rows) {
      const pizza = pizzas.rows[i]
      let precio = await Precio.find(pizza.precio_id)
      pizza.precio = precio
    }
    return response.status(201).json(pizzas)
  }

  /**
   * Render a form to be used for creating a new pizza.
   * GET pizzas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new pizza.
   * POST pizzas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single pizza.
   * GET pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, response }) {
    const { id } = params

    let pizza = await Pizza.findOrFail(id)
    let precio = await Precio.find(pizza.precio_id)
    pizza.precio = precio
    
    return response.status(201).json(pizza)
  }

  /**
   * Render a form to update an existing pizza.
   * GET pizzas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update pizza details.
   * PUT or PATCH pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a pizza with id.
   * DELETE pizzas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PizzaController
