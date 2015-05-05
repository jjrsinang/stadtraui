Ext.define('Stadtra.view.login.LogIn', {
    extend: 'Ext.container.Container',

    
    xtype: 'login-form-container',
    
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
    },

    items: [
    	{
    		xtype: 'form',
			itemId: 'loginForm',
    		title: 'Log in to STADTRA',
			jsonSubmit: true,
			bodyPadding: 10,
			height: 170,
			width: 300,
    		items: [{
					xtype: 'textfield',
					itemId: 'userField',
					fieldLabel: 'Username',
					name: 'loginId',
					emptyText: 'employee/student no',
					msgTarget: 'side',
					allowBlank: false
				},
				{
					xtype: 'textfield',
					itemId: 'passwordField',
					fieldLabel: 'Password',
					inputType: 'password',
					name: 'password',
					emptyText: 'password',
					msgTarget: 'side',
					allowBlank: false
				},
				{
					xtype: 'displayfield',
					itemId: 'errorText',
					text: '',
					fieldStyle: {
						color: 'red',
						background: 'transparent',
						border: 0
					},
					isFormField: false,
					hidden: true
				}
  		  	],
			fbar: [
				'->',
				{
					xtype: 'button',
					text: 'Log in'
				}
			]
    	}
    ]
});
