'use strict'
const stripe = require('stripe')('sk_test_iw8HCPYDsxMD4t8Kgi0u6EYR00PLkctM3G');
const Pizza = use('App/Models/Pizza')
const Order = use('App/Models/Order')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with stripes
 */
class StripeController {
  /**
   * Show a list of all stripes.
   * GET stripes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const orders = await Order.all()
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for (let i in orders.rows) {
      const order = orders.rows[i]
      const pizzas = JSON.parse(order.pizzas)
      let fecha = order.created_at
      fecha = new Date(fecha)
      fecha = fecha.getDate() + "-" + months[fecha.getMonth()] + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()

      let pizzasNames = []
      for (let k = 0; k < pizzas.length; k++) {
        let pizza = await Pizza.find(pizzas[k])
        let tamanio = JSON.parse(order.tamanios)[k]
        let precio = JSON.parse(order.precios)[k]
        pizzasNames.push({ nombre: pizza.nombre, tamanio, precio, imagen: pizza.imagen })
      }
      //console.log(pizzasNames)        
      order.detalles = pizzasNames
      order.fecha = fecha
      // let detalles = await Pizza.find(order.precio_id)
      // pizza.precio = precio
    }
    return response.status(201).json(orders)
  }

  async user_index({ params, response }) {
    const { nToken } = params
    console.log("Token del usuario enviado: ", nToken)
    const orders = await Order.query()
      .where('nToken', nToken)
      .fetch()
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    for (let i in orders.rows) {
      const order = orders.rows[i]
      const pizzas = JSON.parse(order.pizzas)
      let fecha = order.created_at
      fecha = new Date(fecha)
      fecha = fecha.getDate() + "-" + months[fecha.getMonth()] + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()

      let pizzasNames = []
      for (let k = 0; k < pizzas.length; k++) {
        let pizza = await Pizza.find(pizzas[k])
        let tamanio = JSON.parse(order.tamanios)[k]
        let precio = JSON.parse(order.precios)[k]
        pizzasNames.push({ nombre: pizza.nombre, tamanio, precio, imagen: pizza.imagen })
      }
      //console.log(pizzasNames)        
      order.detalles = pizzasNames
      order.fecha = fecha
      // let detalles = await Pizza.find(order.precio_id)
      // pizza.precio = precio
    }
    return response.status(201).json(orders)
  }

  /**
   * Render a form to be used for creating a new stripe.
   * GET stripes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response }) {
    const { data, pizzas, precios, tamanios, nToken, usuario } = request.only(['data', 'pizzas', 'precios', 'tamanios', 'nToken', 'usuario'])
    // console.log("pizzas", pizzas)
    // console.log("precios", precios)
    // console.log("tamanios", tamanios)
    //console.log("nToken", nToken)
    //console.log(JSON.stringify(nToken))
    console.log("token normal" + nToken)

    const charge = await stripe.charges.create({
      amount: 17900,
      currency: 'mxn',
      description: 'Pizza',
      source: data.id,
    });

    try {

      const order = await Order.create({
        pizzas: JSON.stringify(pizzas),
        tamanios: JSON.stringify(tamanios),
        precios: JSON.stringify(precios),
        charge_id: charge['id'],
        nToken: nToken,
        usuario: JSON.stringify(usuario)
      })
    }
    catch (error) {
      console.log(error)
    }

    //console.log(charge)

    return response.status(201).json({ message: 'succes' })
  }

  /**
   * Create/save a new stripe.
   * POST stripes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single stripe.
   * GET stripes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing stripe.
   * GET stripes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update stripe details.
   * PUT or PATCH stripes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id, estado } = request.only(['id', 'estado'])

    let order = await Order.find(id)

    if (!order) {
      return response.status(404).json({
        msg: 'Ese order no existe'
      })
    }

    order.estado = estado
    await order.save()

    return response.status(201).json(order)
  }

  /**
   * Delete a stripe with id.
   * DELETE stripes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = StripeController
