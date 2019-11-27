'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Usuario = use('App/Models/Usuario')

class UsuarioController {
  async registrar ({ request }) {
    const data = request.only(['id', 'login', 'password', 'contratante'])

    const usuario = await Usuario.create(data)

    return usuario
  }
  
}

module.exports = UsuarioController
