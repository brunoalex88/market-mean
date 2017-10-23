 function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status('401').json('Não autorizado');
    }
}

module.exports = function(app) {
    
    var controller = app.controllers.item;

    app.route('/item')
        .get(verificaAutenticacao, controller.listItems)
        .post(verificaAutenticacao, controller.salvaItem);

     app.route('/item/:id')
        .get(verificaAutenticacao, controller.listItem)
        .delete(verificaAutenticacao, controller.removeItem); 

};