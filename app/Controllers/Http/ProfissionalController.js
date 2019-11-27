'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Profissional = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with profissionals
 */
class ProfissionalController {
  /**
   * Show a list of all profissionals.
   * GET profissionals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const profissionais = await Profissional
    .query()
    .where('tipo','like','%P%')
    .orderBy('codigo')
    .fetch()

    return profissionais
  }


  /**
   * Create/save a new profissional.
   * POST profissionals
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {    
    const dados = request.body    

    try {
      await Profissional.create(dados)
      return response.status(201).send('Novo Profissional cadastrado com sucesso!')
    } catch (error) {      
      return response.status(500).send('Erro ao cadastrar novo profissional. Detalhe: ' + error)
    } 
  }

  /**
   * Display a single profissional.
   * GET profissionals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const profissional = await Profissional.find(params.id)

    return profissional
  }

  /**
   * Update profissional details.
   * PUT or PATCH profissionals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const profissional = await Profissional.find(params.id)
    const dados  = await request.body

    if (cliente != null) {
      cliente.merge(dados)

      try {
        await profissional.save()
        return response.status(200).send('Profissional ' + profissional.codigo + ' atualizado com sucesso')
      } catch (error) {
        return response.status(500).send('Erro ao atualizar profissional. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Delete a profissional with id.
   * DELETE profissionals/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const profissional = await Profissional.findOrFail(params.id)

    if (profissional != null) {
      try {
        profissional.delete()
        return response.status(200).send('Profissional excluído com sucesso')
      } catch (error) {
        return response.status(500).send('Erro ao tentar excluir profissional. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }
}

module.exports = ProfissionalController
