Ext.define('Stadtra.view.homepage.Students',{
	extend: 'Ext.panel.Panel',
	xtype: 'student-panel',
	
	requires: [
		'Stadtra.view.homepage.StudentTable'
	],
	
	title: 'Students',
	
	items: [
		{
			xtype: 'student-table'
		}
	]
});

