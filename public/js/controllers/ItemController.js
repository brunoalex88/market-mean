angular.module('market-mean').controller('ItemController', function($scope, Item, Buy) {

    $scope.produtos = [];
    $scope.produtosComprar = [];
    $scope.mensagem = {texto: ''};
    $scope.filtro = '';
    $scope.produto = {};
    $scope.modalTitle = '';

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

    $scope.salvarProduto = function() {
        Item.save($scope.produto, function() {
            mensagem = {'texto': 'Produto salvo!'};
            listaProdutos();
        });
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
		Item.delete({id: produto._id},
			listaProdutos,
			function(erro) {
				console.log(erro);							
				$scope.mensagem = {
					texto: 'Não foi possível remover contato'
				};
            }
        );
    };

    function listaProdutos() {
        console.log('Lista Produtos');

        Item.query(function(produtos) {
            $scope.produtos = produtos;
            $scope.mensagem = {};
        },
        function(erro) {
            console.log('Erro ao buscar os itens cadastrados: ' + erro);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.message};
        });
    };

    function listaCompras() {
        console.log('Lista Compras');

        Buy.query(function(produtosComprar) {
            $scope.produtosComprar = produtosComprar;
            $scope.mensagem = {};
        },
        function(erro) {
            console.log('Erro ao buscar os itens cadastrados: ' + erro);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.message};            
        });
    };

    function callCompras() {
        console.log('Call Compras');
        listaCompras();
        $window.location.href = '#/comprar';
    }

    listaProdutos();

});