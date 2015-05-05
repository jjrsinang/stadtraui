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
						{ fieldLabel: 'Sex',			name: 'sex'},
						{ xtype: 'button', text: 'Change Adviser'}
					]
				}
			]
		}
	]
});