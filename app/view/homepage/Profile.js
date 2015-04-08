Ext.define('Stadtra.view.homepage.Profile', {
    extend: 'Ext.panel.Panel',
    xtype: 'profile',
    
    
    title: 'Profile',

    layout: 'column',
    
    defaults: {
        layout: 'form',
        xtype: 'container',
        style: 'width: 50%'
    },
    
    items: [
		{
			items: [
				{
					xtype: 'form',
					defaults: {
						xtype: 'displayfield'
					},
					items: [
						{ fieldLabel: 'First Name',		name: 'fName'},
						{ fieldLabel: 'Middle Name',	name: 'mName'},
						{ fieldLabel: 'Last Name',		name: 'lName'},
						{ fieldLabel: 'Role',			name: 'role'},
						{ fieldLabel: 'Email Address',	name: 'email'}
					]
				}
			]
		},
		{
			defaults: {
				xtype: 'displayfield'
			},
			items: [
				{ fieldLabel: 'Street Address 1' },
				{ fieldLabel: 'Street Address 2' },
				{ fieldLabel: 'City, State' },
				{ fieldLabel: 'ZIP code' }
			]
		}
	]
});