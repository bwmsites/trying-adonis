'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProdutoGradeProduto extends Model {
    static get updatedAtColumn () {        
        return null
      }

    static get createdAtColumn () {
        return null
    }

    static get table(){
        return 'produto_grade_produto'
    }

    static get primaryKey() {
        return null
    }

    static get incrementing() {
        return false
    }

    //static get updatePrimaryKey() {
        //return ['grade','produto']
    //}
}

module.exports = ProdutoGradeProduto
