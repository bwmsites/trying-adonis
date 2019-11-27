'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GradeProduto extends Model {
    static get updatedAtColumn () { 
        return null //desabilita esse recurso         
      }

    static get createdAtColumn () {
        return null
    }

    static get table(){
        return 'produto_grade'
    }
}

module.exports = GradeProduto
