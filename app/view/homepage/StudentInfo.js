Ext.define('Stadtra.view.homepage.StudentInfo', {
	extend: 'Ext.window.Window',
	
	xtype: 'student-info',
	height: 500,
	width: 500,
	
	title: 'Info',
	modal: true,
	
	items: [
		{
			xtype: 'form',
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
					fieldLabel: 'Student Number',
					name: 'studentNo'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Classification',
					name: 'classification'
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