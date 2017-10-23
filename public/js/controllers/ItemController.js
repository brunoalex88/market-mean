angular.module('market-mean').controller('ItemController', function($scope, $http, ItemResource) {

    $scope.produtos = [];
    $scope.produtosComprar = [];
    $scope.mensagem = {texto: ''};
    $scope.filtro = '';
    $scope.produto = {};
    $scope.modalTitle = '';
    $scope.currentUser = '';

    $scope.alterar = function(produto) {
        if (typeof produto === "undefined") {
            $scope.produto = {
                descricao: "",
                estoqueMinimo: 0,
                estoqueAtual: 0};
            $scope.modalTitle = 'NOVO PRODUTO'
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
        ItemResource.save($scope.produto, function() {
            mensagem = {'texto': 'Produto salvo!'};
            listaProdutos();
        });
    };

    $scope.listaCompras = function() {
        var lista = [];
        
        for (produto in $scope.produtos)
            if ($scope.produtos[produto].estoqueAtual < $scope.produtos[produto].estoqueMinimo)
                lista.push($scope.produtos[produto]);

        $scope.produtos = lista;
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

    $scope.remover = function(produto) {
		ItemResource.delete({id: produto._id},
			listaProdutos,
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

    listaProdutos();
    getUserLogged();

});