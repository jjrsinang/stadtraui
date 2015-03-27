/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Stadtra.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Stadtra',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    controllers: [
        'Stadtra.controllers.LoginController'
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
