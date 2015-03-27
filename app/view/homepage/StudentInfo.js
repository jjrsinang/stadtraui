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
					fieldLabel: 'Name',
					name: 'name'
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'Student Number',
					name: 'studentNumber'
				}
			]
		}
	]
});