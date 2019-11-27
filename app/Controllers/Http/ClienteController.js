'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Cliente = use('App/Models/Pessoa')

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const clientes = await Cliente
      .query()
      .where('tipo','like','%C%')
      .orderBy('codigo')
      .fetch()
    
    return clientes;
  }

  /**
   * Create/save a new cliente.
   * POST clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {    
    const dados = request.body

    try {
      await Cliente.create(dados)      
      response.status(201).send('Novo cliente cadastrado com sucesso.')      
    } catch (error) {      
      return response.status(500).send('Erro ao cadastrar novo cliente. Detalhe: ' + error)
    }    
  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const cliente = await Cliente.find(params.id);

    return cliente;
  }

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const cliente = await Cliente.find(params.id)
    const dados  = await request.body

    if (cliente != null) {
      cliente.merge(dados)

      try {
        await cliente.save()
        return response.status(200).send('Cliente código ' + cliente.codigo + ' atualizado com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao atualizar cliente. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const cliente = await Cliente.find(params.id)

    if (cliente != null) {
      try {
        await cliente.delete()
        return response.status(200).send('Cliente excluído com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao tentar excluir cliente. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Cliente ' + params.id + ' não existe')
    }
  }
}

module.exports = ClienteController
