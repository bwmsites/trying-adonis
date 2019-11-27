'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const DB = use('Database')

class Pessoa extends Model {
    static get updatedAtColumn () {
        //return 'updated_at' => habilita esse recurso 
        return null //desabilita esse recurso         
      }

    static get createdAtColumn () {
        return null
    }

    static get table() {
        return 'pessoa'
    }

}

module.exports = Pessoa
