'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class GrupoProduto extends Model {
    static get updatedAtColumn () {        
        return null
      }

    static get createdAtColumn () {
        return null
    }

    static get table(){
        return 'grupo_produto'
    }
}

module.exports = GrupoProduto
