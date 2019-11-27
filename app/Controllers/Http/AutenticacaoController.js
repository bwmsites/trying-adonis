'use strict'

const UserAPI = use('App/Models/User')

class AutenticacaoController {
    async registrar ({ request }) {
        const dados = request.only(['username', 'password']);

        const userapi = await UserAPI.create(dados)

        return userapi
    }
    
    async autenticar ({ request, auth }) {
        const { username, password } = request.all()    

        const token = await auth.attempt(username, password)
        
        return token
    }
}

module.exports = AutenticacaoController
