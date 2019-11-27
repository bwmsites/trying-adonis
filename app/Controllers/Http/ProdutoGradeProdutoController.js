'use strict'

const GradeProduto = use('App/Models/ProdutoGradeProduto')
const DB = use('Database')

class ProdutoGradeProdutoController {
    async show({ params }) {
        const grade = await GradeProduto
        .query()
        .select('produto_grade_produto.grade', 'produto_grade.descricao as descricao', 'produto_grade_produto.produto','produto_grade_produto.valor')
        .leftJoin('produto_grade','produto_grade_produto.grade', 'produto_grade.id')
        .where('produto_grade_produto.produto', params.id)
        .fetch()
        return grade
    }

    async save ({ request }) {
      const dados = request.collect(['flag', 'grade', 'produto', 'valor'])

      try {
        await Promise.all(dados.map(async (dado) => {
          switch (dado.flag) {
            case 'I':
              this.insert(dado)
            case 'D':
              this.delete(dado)              
            default:
              this.update(dado)
          }
        }))
        return true
      } catch (error) {
        return false
      }
    }

    async insert (grade = {}) {
      const _grade = {
        grade: grade.grade,
        produto: grade.produto,
        valor: grade.valor
      }

      await GradeProduto.create(_grade)
    }

    async delete (grade = {}) {
      await DB
        .from('produto_grade_produto')
        .where('grade', grade.grade)
        .where('produto', grade.produto)
        .delete()
    }

    async update(grade) {
      await GradeProduto
        .query()
        .where('grade', grade.grade)
        .where('produto', grade.produto)
        .update({valor: grade.valor})            
     }
}

module.exports = ProdutoGradeProdutoController
