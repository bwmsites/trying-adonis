'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Conta = use('App/Models/Conta')

/**
 * Resourceful controller for interacting with contas
 */
class ContaController {
  /**
   * Show a list of all contas.
   * GET contas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const contas = await Conta.all()

    return contas
  }

  /**
   * Create/save a new conta.
   * POST contas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const dados = request.body   
    
    try {
      const conta = await Conta.findBy({ 'codigo': dados.codigo })
      if (conta) {
        return response.status(406).send('Nova conta NÃO cadastrada. Motivo: Código já existe')    
      } else {
        try {
          await Conta.create(dados)        
          //return response.status(201).send('Nova conta "' + dados.codigo + '" cadastra com sucesso')
          return 'OK'
        } catch (error) {
          return response.status(500).send('Erro ao tentar cadastrar nova conta. Detalhe: ' + error)
        }
      }
    } catch (error) {
      return response.status('404').send('Erro! Não foram encontrados dados para registrar.')
    }
    
  }

  /**
   * Display a single conta.
   * GET contas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const conta = await Conta.findBy({ 'codigo': params.codigo })

    return conta
  }

 /**
   * Update conta details.
   * PUT or PATCH contas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const conta = await Conta.find(params.codigo)
    const dados = request.body

    if (conta) {
      conta.merge(dados)

      try {
        await conta.save()
        return response.status(200).send('Conta atualizada com sucesso')
      } catch (error) {
        return response.status(500).send('Erro ao tentar atualizar conta. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Não foram localizados dados para esta consulta. Revise os parâmetros e tente novamente')
    }
  }

  /**
   * Delete a conta with id.
   * DELETE contas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const conta = await Conta.findBy({ 'codigo': params.codigo })

    if (conta) {      
      try {
        await conta.delete()
        return response.status(200).send('Conta excluída com sucesso')
      } catch (error) {
        return response.status(500).send('Erro ao tentar excluir conta. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Não foram localizados dados para esta operação. Revise os parâmetros e tente novamente')
    }
  }

  async storebulk ({ request }) {
    const dados = request.collect([
      'codigo',
      'descricao',
      'tipo_contabil',
      'saldo_inicial',
      'aceita_lancamento'
    ])

    const conta = await Conta.createMany(dados)

    return conta
  }


}

module.exports = ContaController
