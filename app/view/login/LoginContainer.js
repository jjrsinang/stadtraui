Ext.define('Stadtra.view.login.LoginContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Stadtra.view.login.LogIn',
        'Stadtra.view.login.Announcement'
    ],
    
    xtype: 'login-container',
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
    	{
    		xtype: 'announcement-container',
            width: '50%'
    	},
        {
            xtype: 'login-form-container',
            width: '50%'
        }

    ]
});
