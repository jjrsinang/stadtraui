Ext.define('Stadtra.view.homepage.AdviserInfo', {
	extend: 'Ext.window.Window',
	
	xtype: 'adviser-info',
	height: 500,
	width: 500,
	
	title: 'Info',
	modal: true,
	autoScroll: true,
	
	items: [
		{
			xtype: 'form',
			bodyPadding: 10,
			items: [
				{
					xtype: 'displayfield',
					fieldLabel: 'First Name',
					name: 'fName'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Middle Name',
					name: 'mName'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Last Name',
					name: 'lName'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Employee Number',
					name: 'employeeNo'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Email',
					name: 'email'
				}
			]
		}
	]
});