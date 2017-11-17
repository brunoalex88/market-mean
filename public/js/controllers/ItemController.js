angular.module('market-mean').controller('ItemController', function($scope, $http, ItemResource, $log) {

    $scope.produtos = [];
    $scope.mensagem = {texto: ''};
    $scope.filtro = '';
    $scope.modalTitle = '';
    $scope.currentUser = '';

    $scope.alterar = function(produto) {
        $log.info('$scope.alterar');

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
        $log.info('$scope.deleteModal');
        $scope.modalTitle = 'EXCLUIR PRODUTO'
        $scope.produto = produto;
    }

    $scope.salvarProduto = function() {
        $log.info('$scope.salvarProduto');
        $scope.produto.$save()
            .then(function() {
                $scope.mensagem = {texto: 'Produto salvo com sucesso!'};
                chooseList();
            })
            .catch(function(err) {
                $scope.mensagem = {texto: 'Não foi possível salvar o produto!'};
            });
    };

    $scope.chooseList = function() {
        $log.info('$scope.chooseList');
        chooseList();
    };

    $scope.aumentaEstoqueMinimo = function() {
        $log.info('$scope.aumentaEstoqueMinimo');
        $scope.produto.estoqueMinimo++;
    };

    $scope.diminuiEstoqueMinimo = function() {
        $log.info('$scope.diminuiEstoqueMinimo');
        $scope.produto.estoqueMinimo--;
    };

    $scope.aumentaEstoqueAtual = function() {
        $log.info('$scope.aumentaEstoqueAtual');
        $scope.produto.estoqueAtual++;
    };

    $scope.diminuiEstoqueAtual = function() {
        $log.info('$scope.diminuiEstoqueAtual');
        $scope.produto.estoqueAtual--;
    };

    $scope.listaProdutos = function() {
        $log.info('$scope.listaProdutos');
        listaProdutos();
    };

    function getUserLogged() {
        $log.info('getUserLogged');
        $http.get('/user')
            .then(function(result) {
                $scope.currentUser = result.data;
            }
        );
    };

    function listaProdutos() {
        $log.info('listaProdutos');

        ItemResource.query(function(produtos) {
            $scope.produtos = produtos;
            $scope.filtro = '';
        },
        function(erro) {
            $log.info('Erro ao buscar os itens cadastrados: ' + erro.data);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.data};
        });

    };

    function listaCompras() {
        $log.info('listaCompras');
        var lista = [];
        
        ItemResource.query(function(produtos) {
            $scope.filtro = '';

            for (p in produtos)
                if (produtos[p].estoqueAtual < produtos[p].estoqueMinimo)
                    lista.push(produtos[p]);
            
            $scope.produtos = lista;

        },
        function(erro) {
            $log.info('Erro ao buscar os itens cadastrados: ' + erro.data);
            $scope.mensagem = {texto: 'Erro ao buscar os itens cadastrados: ' + erro.data};
        });

    };  
    
    function chooseList() {
        $log.info('chooseList');
        var checked = document.getElementById('toggleLista').checked;
        $log.info('Checked: ' + checked);
        
        if (!checked) {
            $log.info('Lista produtos');
            listaProdutos();
        } else {
            $log.info('Lista produtos');
            listaCompras();        
        }
    }

    $scope.remover = function(id) {
        $log.info('$scope.remover');

        ItemResource.delete({id: id},
            chooseList,
            function(erro) {
                $log.info('Não foi possível remover o produto: ' + err);
                $scope.mensagem = {texto: 'Erro ao remover o produto: ' + erro};                
            }
        );
    }

    listaProdutos();
    getUserLogged();

});