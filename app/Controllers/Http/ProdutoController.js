'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Produto = use('App/Models/Produto')
const DB = use('Database')

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const produtos = await Produto
    .query()
    .select()
    .whereNot('status', 'D')
    .orderBy('codigo')
    .fetch()
    
    return produtos
  }


  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const dados = request.body

    try {
      await Produto.create(dados)
      return response.status(201).send('Novo produto/servico cadastrado com sucesso!')
    } catch (error) {
      return response.status(500).send('Erro ao cadastrar novo produto/servico. Detalhe: ' + error)
    }
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const produto = await Produto.find(params.id)
    
    return produto
  }

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const produto = await Produto.find(params.id)
    const dados   = request.body

    if (produto != null) {
      produto.merge(dados)

      try {
        await produto.save()
        return response.status(200).send('Produto/Servico ' + produto.codigo + ' atualizado com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao tentar atualizar dados do produto/servico . Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const produto = await Produto.find(params.id)

    if (produto != null) {
      try {
        produto.status = 'D'
        await produto.save()
        return response.status(200).send('Produto/Servico excluido com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao tentar excluir produto/servico. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  async getKey () {
    return DB.raw('select nextval(\'prduto_id_seq\')')
  }

}

module.exports = ProdutoController
