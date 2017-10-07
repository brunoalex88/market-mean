angular.module('market-mean').controller('ItemController', function($scope, Item) {

    $scope.produtos = [];
    $scope.mensagem = {texto: ''};
    $scope.filtro = '';
    $scope.produto = {};

    $scope.alterar = function(produto) {
        $scope.produto = produto;
    };

    $scope.salvarProduto = function() {
        Item.save($scope.produto, function() {
            mensagem = {'texto': 'Produto salvo!'};
            listaProdutos();
        });
    };

    function listaProdutos() {
        Item.query(function(produtos) {
            $scope.produtos = produtos;
            $scope.mensagem = {};
        },
        function(erro) {
            console.log('Erro ao buscar os itens cadastrados: ' + erro);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro};
        });
    };

    listaProdutos();

});