'use strict'

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class Messages {
    constructor () {
        
    }

    /**
   *
   * @param {Response} ctx.response
   */
    Success (msg) {
        return  response.status(200).send(msg) //+ "status": 200, "msg": msg }
    }

    Error (msg) {
        return Response.status(500).send(msg) //{ "status": 500, "msg":  msg }
    }
}



module.exports = Messages