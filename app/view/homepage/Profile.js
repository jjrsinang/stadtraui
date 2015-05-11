Ext.define('Stadtra.view.homepage.Profile', {
    extend: 'Ext.panel.Panel',
 
    xtype: 'profile',
        
    title: 'Profile',

    layout: 'center',
    
    autoScroll: true,

    items: [
		{
	        layout: 'form',
			itemId: 'formItem',
	        xtype: 'container',
	        width: 700,

			items: [
				{	
					xtype: 'form',
			        padding: 10,
					defaults: {
						xtype: 'displayfield',
						labelWidth: 200
					},
					items: [
						{ fieldLabel: 'First Name',		name: 'fName'},
						{ fieldLabel: 'Middle Name',	name: 'mName'},
						{ fieldLabel: 'Last Name',		name: 'lName'},
						{ fieldLabel: 'Role',			name: 'role'},
						{ fieldLabel: 'Email Address',	name: 'email'},
						{ fieldLabel: 'Sex',			name: 'sex'}
					]
				}
			]
		}
	],
	
	listeners: {
		afterrender: function(panel) {
			if (Stadtra.app.userSession) {
				if (Stadtra.app.userSession.data.user.student) {
					panel.down('form').add({ xtype: 'button', text: 'Change Adviser', itemId: 'changeAdviserButton'});
				}
			}
		}
	}
	
});