angular.module('market-mean').controller('ItemController', function($scope, $http, ItemResource, $q) {

    $scope.produtos = [];
    $scope.mensagem = {texto: ''};
    $scope.filtro = '';
    $scope.modalTitle = '';
    $scope.currentUser = '';

    $scope.alterar = function(produto) {
        if (typeof produto === "undefined") {
            $scope.produto = new ItemResource();
            $scope.produto.estoqueAtual = 0;
            $scope.produto.estoqueMinimo = 0
            $scope.modalTitle = 'NOVO PRODUTO';
        } else {
            $scope.modalTitle = 'ALTERAR PRODUTO';
            $scope.produto = produto;
        }
    };

    $scope.deleteModal = function(produto) {
        $scope.modalTitle = 'EXCLUIR PRODUTO'
        $scope.produto = produto;
    }

    $scope.salvarProduto = function() {
        $scope.produto.$save()
            .then(function() {
                $scope.mensagem = {'texto': 'Produto salvo!'};
                chooseList();
            })
            .catch(function(err) {
                $scope.mensagem = {'texto': 'Não foi possível salvar o produto!'};
            });
    };

    $scope.chooseList = function() {
        chooseList();
    };

    $scope.aumentaEstoqueMinimo = function() {
        $scope.produto.estoqueMinimo++;
    };

    $scope.diminuiEstoqueMinimo = function() {
        $scope.produto.estoqueMinimo--;
    };

    $scope.aumentaEstoqueAtual = function() {
        $scope.produto.estoqueAtual++;
    };

    $scope.diminuiEstoqueAtual = function() {
        $scope.produto.estoqueAtual--;
    };

    $scope.listaProdutos = function() {
        listaProdutos();
    };

    $scope.remover = function(id) {
        
		ItemResource.delete({"id": id},
			chooseList(),
			function(erro) {
				console.log(erro);							
				$scope.mensagem = {
					texto: 'Não foi possível remover contato'
				};
            }
        );

    };

    function getUserLogged() {
        $http.get('/user')
            .then(function(result) {
                $scope.currentUser = result.data;
            }
        );
    };

    function listaProdutos() {

        ItemResource.query(function(produtos) {
            $scope.produtos = produtos;
            $scope.mensagem = {};
            $scope.filtro = '';
        },
        function(erro) {
            console.log('Erro ao buscar os itens cadastrados: ' + erro.data);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.data};
        });

    };

    function listaCompras() {
        var lista = [];
        
        ItemResource.query(function(produtos) {
            $scope.mensagem = {};
            $scope.filtro = '';

            for (p in produtos)
                if (produtos[p].estoqueAtual < produtos[p].estoqueMinimo)
                    lista.push(produtos[p]);
            
            $scope.produtos = lista;

        },
        function(erro) {
            console.log('Erro ao buscar os itens cadastrados: ' + erro.data);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.data};
        });

    };  
    
    function chooseList() {
        var checked = document.getElementById('toggleLista').checked;
        
        if (!checked)
            listaProdutos();
        else
            listaCompras();        
    }

    listaProdutos();
    getUserLogged();

});