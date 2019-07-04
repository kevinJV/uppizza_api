'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.resource('pizza', 'PizzaController')
})
Route.post('/order', 'StripeController.create')
Route.put('/order', 'StripeController.update')
Route.get('/order', 'StripeController.index')
Route.get('/user_order/:nToken', 'StripeController.user_index')
Route.post('/nose', 'StripeController.store')

Route.on('/').render('welcome')
