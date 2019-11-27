'use strict'

class TesteController {
    async many ({ request }) {
        const dados = request.collect(['data'])

        return dados
    }
}

module.exports = TesteController
