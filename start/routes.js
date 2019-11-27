'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
//const DataBase = use('Database')

//Route.get('produto', 'ProdutoController.index')

/*************************************************
 Grupo para rotas que precisam de  autenticação
**************************************************/
Route.group(() => {

  Route.get('/', () => {
    return { greeting: 'Wisdon API 2.0 ... Main Page' }
  })

  //Cadastro de clientes
  Route.resource('cliente', 'ClienteController').apiOnly()

  //Cadastro de Profissionais
  Route.resource('profissional', 'ProfissionalController').apiOnly()

  //Cadastro de Fornecedores
  Route.resource('fornecedor', 'FornecedorController').apiOnly()

  // Cadastro de Produtos/Serviços
  Route.resource('produto', 'ProdutoController').apiOnly()
  Route.get('produto/:id/grade', 'ProdutoGradeProdutoController.show')
  Route.put('produto/:id/grade', 'ProdutoGradeProdutoController.update')
  Route.post('produto/:id/grade', 'ProdutoGradeProdutoController.store')
  Route.post('produto/grade', 'ProdutoGradeProdutoController.save')
  Route.get('produto/key', 'ProdutoController.getKey')
  
  // Cadastro de Grades de Produtos
  Route.resource('grade-produto', 'GradeProdutoController').apiOnly()

  // Cadastro de Grupos de Produtos
  Route.resource('grupo-produto', 'GrupoProdutoController').apiOnly()

  // Cadastro de plano de contas
  Route.get('contas', 'ContaController.index')
  Route.post('contas', 'ContaController.store')
  Route.get('contas/:codigo', 'ContaController.show')
  Route.put('contas/:codigo', 'ContaController.update')
  Route.delete('contas/:codigo', 'ContaController.destroy')
  
  // Registro e Autenticacao de usuarios
  Route.get('usuario/registrar', 'UsuarioController.registrar')

  // Configuracoes de Contas  

  // Recursos uteis
  Route.get('/get-key/:contratante', 'UtilController.getKey')
  Route.get('/get-codigo/:tab/:contratante', 'UtilController.getCodigo')
  Route.get('/consultar/:tab/:fields/:condition', 'UtilController.consultar')

}).middleware(['auth'])

/******************************************
 Rotas sem autenticação
******************************************/
Route.get('autenticacao','AutenticacaoController.autenticar')
Route.post('autenticacao/registrar', 'AutenticacaoController.registrar')

Route.get('teste','TesteController.many')

/* Exemplo
Route.group(() => {
  Route.get('/:id', ({params}) => {
    return DataBase.table('cliente').where('id',`${params.id}`);    
  })
}).prefix('cliente')


//Route.route('produto/:id/grade', 'ProdutoGradeProdutoController', ['GET', 'POST', 'PUT'])
*/  