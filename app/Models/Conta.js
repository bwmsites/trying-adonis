'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Conta extends Model {
    static get updatedAtColumn () {        
        return null
      }

    static get createdAtColumn () {
        return null
    }

    static get table() {
        return 'contas'
    } 
    
    static get primaryKey() {
        return 'codigo'
    }

    static get incrementing() {
        return false
    }
}

module.exports = Conta
