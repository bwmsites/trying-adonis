'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Grupo = use('App/Models/GrupoProduto')

/**
 * Resourceful controller for interacting with grupoprodutos
 */
class GrupoProdutoController {
  /**
   * Show a list of all grupoprodutos.
   * GET grupoprodutos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const grupos = await Grupo
    .query()
    .whereNot('status', 'D')
    .fetch()

    return grupos
  }

  /**
   * Create/save a new grupoproduto.
   * POST grupoprodutos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const dados = request.body

    try {
      await Grupo.create(dados)
      return response.status(201).send('Novo grupo de produtos cadastrado com sucesso!')
    } catch (error) {
      return response.status(500).send('Erro ao cadastrar novo grupo de produtos. Detalhe: ' + error)
    }
  }

  /**
   * Display a single grupoproduto.
   * GET grupoprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

/**
   * Update grupoproduto details.
   * PUT or PATCH grupoprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a grupoproduto with id.
   * DELETE grupoprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = GrupoProdutoController
