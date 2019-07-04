'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pizza extends Model {
    precio(){
        return this.hasOne('App/Models/Precio')
    }
}

module.exports = Pizza
