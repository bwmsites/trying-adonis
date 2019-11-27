'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Fornecedor = use('App/Models/Pessoa');

/**
 * Resourceful controller for interacting with fornecedors
 */
class FornecedorController {
  /**
   * Show a list of all fornecedors.
   * GET fornecedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const fornecedores = await Fornecedor
    .query()
      .where('tipo','like','%F%')
      .orderBy('codigo')
      .fetch()

    return fornecedores
  }

  /**
   * Create/save a new fornecedor.
   * POST fornecedors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const fornecedor = new Fornecedor()
    const dados = await request.body

    if (fornecedor != null) {
      fornecedor.merge( dados )

      try {
        await fornecedor.save()
        return response.status(201).send('Novo Forncedor cadastrado com sucesso!')
      } catch (error) {      
        return response.status(500).send('Erro ao cadastrar novo fornecedor. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Display a single fornecedor.
   * GET fornecedors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const fornecedor = await Fornecedor.find(params.id)

    return fornecedor
  }

  /**
   * Update fornecedor details.
   * PUT or PATCH fornecedors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const fornecedor = await Fornecedor.find(params.id)

    const dados = await request.body

    if (fornecedor != null) {
      fornecedor.merge(dados)

      try {
        await fornecedor.save()
        return response.status(200).send('Forncedor atualizado com sucesso!')
      } catch (err) {      
        return response.status(500).send('Erro ao atualizar dados do fornecedor. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Delete a fornecedor with id.
   * DELETE fornecedors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const fornecedor = await Fornecedor.find(params.id)

    if (fornecedor != null) {
      try {
        await fornecedor.delete()
        return response.status(200).send('Forncedor excluido com sucesso!')
      } catch (error) {      
        return response.status(500).send('Erro ao tentar excluir fornecedor. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }
}

module.exports = FornecedorController
