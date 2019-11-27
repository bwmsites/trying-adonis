'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const GradeProduto = use('App/Models/GradeProduto')

/**
 * Resourceful controller for interacting with gradeprodutos
 */
class GradeProdutoController {
  /**
   * Show a list of all gradeprodutos.
   * GET gradeprodutos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const grades = await GradeProduto.all()

    return grades
  }

/**
   * Create/save a new gradeproduto.
   * POST gradeprodutos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const dados = request.body

    try {
      await GradeProduto.create(dados)
      return response.status(201).send('Nova grade de produtos cadastrada com sucesso!')
    } catch (error) {
      return response.status(500).send('Erro ao cadastrar nova grade de produtos. Detalhe: ' + error)
    }
  }

  /**
   * Display a single gradeproduto.
   * GET gradeprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const grade = await GradeProduto.find(params.id)

    return grade
  }

 /**
   * Update gradeproduto details.
   * PUT or PATCH gradeprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const grade = await GradeProduto.find(params.id)
    const dados = request.body

    if (grade != null) {
      grade.merge(dados)

      try {
        await grade.save()
        return response.status(200).send('Grade de produtos código ' + grade.codigo + ' atualizada com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao tentar editar grade de produtos. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }

  /**
   * Delete a gradeproduto with id.
   * DELETE gradeprodutos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const grade = await GradeProduto.find(params.id)

    if (grade) {
      try {
        await grade.delete()
        return response.status(200).send('Grade de produtos excluída com sucesso!')
      } catch (error) {
        return response.status(500).send('Erro ao tentar excluir grade de produtos. Detalhe: ' + error)
      }
    } else {
      return response.status(404).send('Dados de consulta inválidos. Reveja os parâmetros e tente novamente.')
    }
  }
}

module.exports = GradeProdutoController
