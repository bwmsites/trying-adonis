'use strict'

const DB = use('Database')

class UtilController {
  async getKey ({ params }) {
    const data = await DB.raw(`
      select get_novo_id_f(${params.contratante}::int4, nextval('controle_id_seq'::text)::int4) 
    `)
    return data.rows[0].get_novo_id_f
  }

  async getCodigo ({ params }) {    
    const data = await DB.raw(`
      select max(codigo) + 1 as codigo from ${params.tab} 
      where contratante =  ${params.contratante}
    `)

    return data.rows[0].codigo
  }

  async consultar ({ params }) {
    const data = await DB.raw(`
      select ${params.fields} from ${params.tab} where ${params.condition}
    `)

    return data.rows
  }
}

module.exports = UtilController