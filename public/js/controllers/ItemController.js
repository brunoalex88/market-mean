angular.module('market-mean').controller('ItemController', function($scope, Item) {

    $scope.produtos = [];
    $scope.mensagem = {texto: ''};

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