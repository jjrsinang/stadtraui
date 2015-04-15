Ext.define('Stadtra.view.homepage.Profile', {
    extend: 'Ext.panel.Panel',
    xtype: 'profile',
    
    
    title: 'Profile',

    layout: 'center',
    
    defaults: {
        layout: 'form',
        xtype: 'container',
        style: 'width: 50%',
        width: 700
    },
    
    autoScroll: true,

    items: [
		{
			items: [
				{	
					xtype: 'form',
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
						{ fieldLabel: 'Street Address 1' },
						{ fieldLabel: 'Street Address 2' },
						{ fieldLabel: 'City, State' },
						{ fieldLabel: 'ZIP code' },
						{ fieldLabel: 'List of Previous Advisers' },
						{ fieldLabel: 'Current Adviser' },
						{ xtype: 'button', text: 'Change Adviser' }
					]
				}
			]
		}
	]
});