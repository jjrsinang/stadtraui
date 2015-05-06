/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Stadtra.view.main.Main', {
    extend: 'Ext.container.Container',
	plugins: 'viewport',
    requires: [
        'Stadtra.view.login.LogIn',
        'Stadtra.view.homepage.HomePage',
		 'Stadtra.view.login.MainContainer'
    ],

    xtype: 'app-main',
	autoScroll: true,
    itemId: 'viewport',

    layout: {
        type: 'card'
    },

    items: [
        {
            xtype: 'main-container'
        },
        {
            xtype: 'home-page'
        }
    ]
});
