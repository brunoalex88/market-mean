module.exports = function(app) {
    
    var controller = app.controllers.item;

    app.route('/item')
        .get(controller.listItems)
        .post(controller.salvaItem);

     app.route('/item/:id')
        .get(controller.listItem)
        .delete(controller.removeItem); 

};