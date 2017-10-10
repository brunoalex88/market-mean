module.exports = function(app) {
    
        var controller = {};
        var Item = app.models.item;
    
        controller.listItems = function(req, res) {
            Item.find().exec()
                .then(function(itens) {
                    res.json(itens);
                },
                function(erro) {
                    console.log('Erro ao buscar os items: ' + erro);
                    res.status(500).json('Erro ao buscar os items: ' + erro);
                }
            );
        };

        controller.listItem = function(req, res) {
            var _id = req.params.id;

            Item.findById(_id).exec()
                .then(function(item) {
                    if (!item) {
                        throw new Error('Item não encontrado');
                    }

                    res.json(item);
                },
                function(erro) {
                    console.log('Erro ao buscar o item: ' + erro);
                    res.status(500).json('Erro ao buscar o item: ' + erro);
                }
            );

        };

        controller.salvaItem = function(req, res) {
            var _id = req.body._id;
            var dados = {
                "descricao": req.body.descricao,
                "estoqueMinimo": req.body.estoqueMinimo,
                "estoqueAtual": req.body.estoqueAtual
            };

            if (_id) {
                Item.findByIdAndUpdate(_id, dados).exec()
                    .then(function(item) {
                        res.json(item);
                    },
                    function(erro) {
                        console.log('Erro ao salvar o item: ' + erro);
                        res.status(500).json('Erro ao salvar o item: ' + erro);
                    }
                );
            } else {
                Item.create(req.body)
                    .then(function(item) {
                        res.status(201).json(item);
                    },
                    function(erro) {
                        console.log('Erro ao criar o item: ' + erro);
                        res.status(500).json('Erro ao criar o item: ' + erro);
                    }
                );
            }
        };

        controller.removeItem = function(req, res) {
            var _id = req.params.id;

            Item.remove({"_id": _id}).exec()
                .then(function(){
                    res.status(204).end();
                }, 
                function(erro) {
                    console.log('Erro ao remover o item: ' + erro);
                    res.status(500).json('Erro ao remover o item: ' + erro);
                }
            );
        };

        controller.listaCompras = function(req, res) {
            Item.find().exec()
                .then(function(items) {
                    comprar = [];
                    for (item in items) {
                        
                        if (items[item].estoqueAtual <= items[item].estoqueMinimo) {
                            comprar.push(items[item]);
                            console.log('Item: ' + items[item]);
                        }
                    }

                    res.json(comprar);

                },
                function(erro) {
                    console.log('Erro ao buscar o item: ' + erro);
                    res.status(500).json('Erro ao buscar o item: ' + erro);
                }
            )
        };
    
        return controller;
    
    };